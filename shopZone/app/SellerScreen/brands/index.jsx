import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../context/AuthContext';
import Api from '../../../service/Api';
import { useRouter } from 'expo-router';
import {  CirclePlus } from 'lucide-react-native';
import multiActionButton from '../../../hooks/multiActionAppBar';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';


const SellerBrandScreen = () => {

  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBrandFormVisible, setNewBrandFormVisible] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandSlug, setNewBrandSlug] = useState('');
  const [newBrandImage, setNewBrandImage] = useState('');
  const [newBrandDescription, setNewBrandDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');




  useEffect(() => {
    const fetchSellerCreatedBrands = async () => {
      try {
        const response = await axios.get(Api.getSellerCreatedBrands, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.brands.length === 0) {
        }

        setBrands(response.data.brands);
      } catch (error) {
        console.error("Error fetching seller-created brands:", error);

        if (error.response && error.response.status === 404) {
          setBrands([]); // Set brands to empty if 404 received for no brands
        } else {
          console.log("An unexpected error occurred.");
        }
      }
    };

    fetchSellerCreatedBrands();
  }, [token]);

  const addBrand = async () => {
    if (newBrandName && newBrandImage && newBrandSlug) {
      const formData = new FormData();
      formData.append('name', newBrandName);
      formData.append('slug', newBrandSlug);
      formData.append('description', newBrandDescription);

      let fileType, fileName, fileUri;

      if (Platform.OS === 'web') {
        const response = await fetch(newBrandImage);
        const blob = await response.blob();
        fileType = blob.type;
        fileName = `brandLogo.${fileType.split('/')[1]}`;
        formData.append('logo', blob, fileName);
      } else {
        const uriParts = newBrandImage.split('.');
        fileType = uriParts[uriParts.length - 1];
        fileName = `brandLogo.${fileType}`;
        fileUri = newBrandImage;

        formData.append('logo', {
          uri: fileUri,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      formData.append('seoTags[title]', seoTitle);
      formData.append('seoTags[description]', seoDescription);
      formData.append('seoTags[keywords]', seoKeywords);

      try {
        const response = await axios.post(Api.brandCreatedBySeller, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        setBrands([...brands, response.data.brand]);
        setNewBrandFormVisible(false);
        resetForm();
      } catch (error) {
        console.error('Error creating brand:', error);
        Alert.alert('Error', 'There was an error creating the brand.');
      }
    } else {
      Alert.alert('Error', 'Please provide brand name, slug, and image.');
    }
  };

  const resetForm = () => {
    setNewBrandName('');
    setNewBrandSlug('');
    setNewBrandDescription('');
    setNewBrandImage('');
    setSeoTitle('');
    setSeoDescription('');
    setSeoKeywords('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewBrandImage(result.assets[0].uri);
    }
  };



  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        if (item.status === 'verified') {
          router.push(`../BrandProduct/${item._id}`);

        } else {
          Alert.alert('Notice', 'Only verified brands can add products.');
        }
      }}
    >
      <Image source={{ uri: Api.main + item.logo }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.cardStatusContainer}>
          {item.status === 'verified' ? (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="green" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <View style={styles.pendingBadge}>
              <Ionicons name="time" size={16} color="orange" />
              <Text style={styles.pendingText}>Pending</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );


  const handleCreateNewBrand = () => {
    setModalVisible(false);
    setNewBrandFormVisible(true);
  };

  const handleSelectBrand = () => {
    setModalVisible(false);
    router.push('../AdminBrand');
  };

  function buttons() {
    return (
      <TouchableOpacity style={styles.headerButtons} onPress={() => setModalVisible(true)}>
        <View style={styles.buttonContent}>
          <Text style={{color:"#000000",marginRight:4}}>Brand</Text>
          <CirclePlus color={"#000000"} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );

  }
  multiActionButton("Brands", true, buttons)

  return (
    <View style={styles.container}>


      {brands.length === 0 ? (
        <Text style={styles.noBrandsMessage}>
          No brands found created by this seller.
        </Text>
      ) : (
        <FlatList
          data={brands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.brandList}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCreateNewBrand}
            >
              <Text style={styles.buttonText}>Create New Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSelectBrand}
            >
              <Text style={styles.buttonText}>Select Brand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={newBrandFormVisible}
        onRequestClose={() => setNewBrandFormVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Brand</Text>
            <TextInput
              style={styles.input}
              placeholder="Brand Name"
              value={newBrandName}
              onChangeText={setNewBrandName}
            />
            <TextInput
              style={styles.input}
              placeholder="Brand Slug"
              value={newBrandSlug}
              onChangeText={setNewBrandSlug}
            />
            <TextInput
              style={styles.input}
              placeholder="Brand Description"
              value={newBrandDescription}
              onChangeText={setNewBrandDescription}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {newBrandImage ? (
                <Image source={{ uri: newBrandImage }} style={styles.previewImage} />
              ) : (
                <Text>Select Brand Image</Text>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="SEO Title"
              value={seoTitle}
              onChangeText={setSeoTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="SEO Description"
              value={seoDescription}
              onChangeText={setSeoDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="SEO Keywords (comma-separated)"
              value={seoKeywords}
              onChangeText={setSeoKeywords}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelOrderButton}
                onPress={() => setNewBrandFormVisible(false)}
              >
                <Text style={styles.cancelOrderButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payNowButton}
                onPress={addBrand}
              >
                <Text style={styles.payNowButtonText}>Add Brand</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '95%',
    alignSelf: 'center',
  },
  cardImage: { width: 80, height: 80, marginRight: 16 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardStatusContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4CAF50', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  verifiedText: { color: 'white', marginLeft: 4, fontWeight: 'bold' },
  pendingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFA726', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  pendingText: { color: 'white', marginLeft: 4, fontWeight: 'bold' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30px',
    padding: 16,
    backgroundColor: 'orange',
  },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  addButton: { padding: 8 },
  brandList: { paddingHorizontal: 16 },
  noBrandsMessage: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },

  actionButton: {
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 8 },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  previewImage: { width: 100, height: 100, borderRadius: 5 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  payNowButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    width: '48%',
  },
  payNowButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelOrderButton: {
    backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    width: '48%',
  },
  cancelOrderButtonText: { color: 'gray', fontSize: 16, fontWeight: 'bold' },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, // Rounded corners for the button

    padding: 5,
    borderRadius:5,
    backgroundColor:"#F2F2F2",
    ...Platform.OS === "web" && {
      marginRight: 20,
    }
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 20, // Icon size
    height: 20,
  },
});

export default SellerBrandScreen;
