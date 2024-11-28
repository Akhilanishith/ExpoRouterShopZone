import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import Api from '../../../service/Api';
import CategoryDropdown from '../../../components/CategoryDropdown';
import SubCategoryDropdown from '../../../components/SubCategoryDropdown';
import TypesDropdown from '../../../components/TypesDropdown';
import { useLocalSearchParams } from 'expo-router';

const AddProduct = () => {
  const { token } = useContext(AuthContext);
  const{brandId}=useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [itemInfo, setItemInfo] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [subtype, setSubtype] = useState('');
  const [images, setImages] = useState([]);

  // const pickImage = async () => {
  //   if (images.length >= 2) {
  //     Alert.alert('Error', 'You can only upload up to 2 images');
  //     return;
  //   }
  
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  //   if (!result.canceled) {
  //     const selectedImage = result.assets?.[0];
  //     const newImageUri = selectedImage?.uri;
  
  //     if (Platform.OS === 'web') {
  //       // Web needs to handle the image as a File object
  //       if (newImageUri) {
  //         const file = await fetch(newImageUri)
  //           .then(res => res.blob())
  //           .then(blob => new File([blob], selectedImage?.fileName, { type: blob.type }));
  
  //         setImages([...images, file]);
  //       } else {
  //         Alert.alert('Error', 'Failed to retrieve image URI');
  //       }
  //     } else {
  //       // Android needs to handle the image as a local file URI
  //       if (newImageUri) {
  //         setImages([...images, newImageUri]);
  //       } else {
  //         Alert.alert('Error', 'Failed to retrieve image URI');
  //       }
  //     }
  //   }
  // };
  const pickImage = async () => {
    if (images.length >= 2) {
      Alert.alert('Error', 'You can only upload up to 2 images');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedImage = result.assets?.[0];
      const newImageUri = selectedImage?.uri;
  
      if (Platform.OS === 'web') {
        // For Web: We use the URI directly for web and try to display it
        if (newImageUri) {
          // Check if the URI is valid for web usage
          setImages(prevImages => [...prevImages, newImageUri]);
        } else {
          Alert.alert('Error', 'Failed to retrieve image URI');
        }
      } else {
        // For Android: Handling image as local file URI
        if (newImageUri) {
          setImages(prevImages => [...prevImages, newImageUri]);
        } else {
          Alert.alert('Error', 'Failed to retrieve image URI');
        }
      }
    }
  };
  
  
  
  const handleSubmit = async () => {
    if (!title || !description || images.length === 0) {
      Alert.alert('Error', 'Please fill out all required fields and upload an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('itemInfo', itemInfo);
    formData.append('description', description);
    formData.append('originalPrice', parseFloat(originalPrice));
    formData.append('sellingPrice', parseFloat(sellingPrice));
    formData.append('color', color);
    formData.append('size', size);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('subtype', subtype);
    formData.append('brandId', brandId);
  
    images.forEach((image, index) => {
      if (Platform.OS === 'web') {
        // Web uploads File object
        formData.append('images', image);
      } else {
        // Android uploads local file URI
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('images', {
          uri: image,
          name: `image_${index}.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    });
  
    try {
      const response = await axios.post(Api.productUploadedBySeller, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Alert.alert(response.data.message);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
      Alert.alert('Error', 'Failed to add product.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upload Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Item Info"
        value={itemInfo}
        onChangeText={setItemInfo}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Description (Longer Text Allowed)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Original Price"
        value={originalPrice}
        onChangeText={setOriginalPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Selling Price"
        value={sellingPrice}
        onChangeText={setSellingPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        style={styles.input}
        placeholder="Size"
        value={size}
        onChangeText={setSize}
      />

      <CategoryDropdown
        selectedCategory={category}
        onCategoryChange={(selectedCategory) => {
          setCategory(selectedCategory);
          setSubcategory('');
          setSubtype('');
        }}
      />

      {category && (
        <SubCategoryDropdown
          selectedSubCategory={subcategory}
          onSubCategoryChange={(selectedSubCategory) => {
            setSubcategory(selectedSubCategory);
            setSubtype('');
          }}
          categoryId={category}
        />
      )}

      {subcategory && (
        <TypesDropdown
          selectedTypes={subtype}
          onTypesChange={setSubtype}
          subcategoryId={subcategory}
        />
      )}

      <Text style={styles.label}>Upload Images (Max 2)</Text>

      <View style={styles.imageContainer}>
      {images.map((image, index) => (
        <Image
      key={index}
      source={{ uri: image }}
      style={styles.image}
      resizeMode="cover" // Ensures the image is properly scaled to fit
    />
))}

        {images.length < 2 && (
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <Text style={styles.addImageButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
  },
  addImageButton: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  addImageButtonText: {
    fontSize: 24,
    color: '#888',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProduct;

























// import React, { useState, useContext, useEffect } from 'react';
// import { Alert } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from '../../../context/AuthContext';
// import Api from '../../../service/Api';
// import * as ImagePicker from 'expo-image-picker';
// import AddProductForm from './AddProductForm';

// const AddProduct = () => {
//   const { token } = useContext(AuthContext);

//   const [title, setTitle] = useState('');
//   const [itemInfo, setItemInfo] = useState('');
//   const [description, setDescription] = useState('');
//   const [originalPrice, setOriginalPrice] = useState('');
//   const [sellingPrice, setSellingPrice] = useState('');
//   const [color, setColor] = useState('');
//   const [size, setSize] = useState('');
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [subtype, setSubtype] = useState('');
//   const [images, setImages] = useState([]);

//   const handleSubmit = async () => {
//     if (!title || !description || images.length === 0) {
//       Alert.alert('Error', 'Please fill out all required fields and upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('itemInfo', itemInfo);
//     formData.append('description', description);
//     formData.append('originalPrice', parseFloat(originalPrice));
//     formData.append('sellingPrice', parseFloat(sellingPrice));
//     formData.append('color', color);
//     formData.append('size', size);
//     formData.append('category', category);
//     formData.append('subcategory', subcategory);
//     formData.append('subtype', subtype);

//     images.forEach((image, index) => {
//       const uriParts = image.split('.');
//       const fileType = uriParts[uriParts.length - 1];
//       formData.append('images', {
//         uri: image,
//         name: `image_${index}.${fileType}`,
//         type: `image/${fileType}`,
//       });
//     });

//     try {
//       const response = await axios.post(Api.addProductEndpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product added successfully!');
//       } else {
//         Alert.alert('Error', 'Failed to add product.');
//       }
//     } catch (error) {
//       console.error('Error:', error.response || error.message);
//       Alert.alert('Error', 'Failed to add product.');
//     }
//   };

//   return (
//     <AddProductForm
//       title={title}
//       setTitle={setTitle}
//       itemInfo={itemInfo}
//       setItemInfo={setItemInfo}
//       description={description}
//       setDescription={setDescription}
//       originalPrice={originalPrice}
//       setOriginalPrice={setOriginalPrice}
//       sellingPrice={sellingPrice}
//       setSellingPrice={setSellingPrice}
//       color={color}
//       setColor={setColor}
//       size={size}
//       setSize={setSize}
//       category={category}
//       setCategory={setCategory}
//       subcategory={subcategory}
//       setSubcategory={setSubcategory}
//       subtype={subtype}
//       setSubtype={setSubtype}
//       images={images}
//       setImages={setImages}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default AddProduct;






