import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';
import { AuthContext } from '../../../context/AuthContext';

export default function BrandSelectScreen() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [permissionRequired, setPermissionRequired] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    invoice: false,
    trademark: false,
    authorizationLetter: false,
  });
  const [documentImages, setDocumentImages] = useState({
    invoice: null,
    trademark: null,
    authorizationLetter: null,
  });

  const { token } = useContext(AuthContext); // Assume userId is available in context
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(Api.getAdminBrands, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(response.data.brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    if (token) {
      fetchBrands();
    }
  }, [token]);

  const handleBrandSelect = (brandName) => {
    setSelectedBrand(brandName);
    setPermissionRequired(true);
    setShowPopup(true);
  };

  const handleUpload = async (documentType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedDocuments((prev) => ({ ...prev, [documentType]: true }));
      setDocumentImages((prev) => ({ ...prev, [documentType]: result.uri }));
    }
  };

  const handleApplyForApproval = async () => {
    try {
      const selectedBrandId = brands.find((brand) => brand.name === selectedBrand)?._id;
      if (!selectedBrandId) {
        alert('Please select a valid brand.');
        return;
      }

      const formData = new FormData();
      formData.append('brandId', selectedBrandId);

      // Attach document image if available
      if (documentImages.invoice) {
        const filename = documentImages.invoice.split('/').pop();
        const type = `image/${filename.split('.').pop()}`;
        formData.append('invoice', {
          uri: documentImages.invoice,
          name: filename,
          type,
        });
      }
console.log(formData)
      await axios.post(`${Api.applyForAdminBrandApproval}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Brand application submitted successfully!');
      setShowPopup(false);
    } catch (error) {
      console.error('Error applying for brand approval:', error);
      alert('Failed to submit brand application. Please try again.');
    }
  };

  const atLeastOneDocumentUploaded = Object.values(uploadedDocuments).some(
    (value) => value
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={handleBrandSelect}
          style={styles.picker}
        >
          <Picker.Item label="Select a brand" value="" />
          {brands.map((brand, index) => (
            <Picker.Item key={brand.id || index} label={brand.name} value={brand.name} />
          ))}
        </Picker>
      </View>

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {permissionRequired && (
              <>
                <Text style={styles.modalTitle}>Permission Required</Text>
                <Text style={styles.modalText}>
                  You don’t have permission to select this brand. Please upload one of the following documents to apply for approval:
                </Text>
                <View style={styles.documentList}>
                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      uploadedDocuments.invoice && styles.uploadedButton,
                    ]}
                    onPress={() => handleUpload('invoice')}
                  >
                    <Text style={styles.uploadButtonText}>
                      {uploadedDocuments.invoice ? 'Invoice ✓' : 'Upload Invoice'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      uploadedDocuments.trademark && styles.uploadedButton,
                    ]}
                    onPress={() => handleUpload('trademark')}
                  >
                    <Text style={styles.uploadButtonText}>
                      {uploadedDocuments.trademark ? 'Trademark ✓' : 'Upload Trademark'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      uploadedDocuments.authorizationLetter && styles.uploadedButton,
                    ]}
                    onPress={() => handleUpload('authorizationLetter')}
                  >
                    <Text style={styles.uploadButtonText}>
                      {uploadedDocuments.authorizationLetter
                        ? 'Authorization Letter ✓'
                        : 'Upload Authorization Letter'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    styles.applyButton,
                    !atLeastOneDocumentUploaded && styles.disabledButton,
                  ]}
                  onPress={handleApplyForApproval}
                  disabled={!atLeastOneDocumentUploaded}
                >
                  <Text style={styles.applyButtonText}>Apply for Approval</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={{ uri: '/placeholder.svg?height=200&width=200' }}
        style={styles.brandImage}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  documentList: {
    width: '100%',
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  uploadedButton: {
    backgroundColor: '#28a745',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: '#007bff',
  },
  brandImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16,
  },
});
