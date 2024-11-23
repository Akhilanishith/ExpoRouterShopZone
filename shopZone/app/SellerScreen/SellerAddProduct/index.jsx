// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import useSetTitle from '../../../hooks/useSetTitle';
// import { AuthContext } from '../../../context/AuthContext';
// import Api from '../../../service/Api';
// import CategoryDropdown from '../../../components/CategoryDropdown';
// import SubCategoryDropdown from '../../../components/SubCategoryDropdown';
// import TypesDropdown from '../../../components/TypesDropdown';
// import { useLocalSearchParams } from 'expo-router';

// function AddProduct() {
//   const { brandId } = useLocalSearchParams(); // Retrieve brandId from navigation params

//   useSetTitle('uploadProduct');
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

//   // Request permissions for accessing the media library
//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'We need access to your photo library to upload images.'
//         );
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     if (images.length >= 2) {
//       Alert.alert('Error', 'You can only upload up to 2 images');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImages([...images, result.assets[0].uri]);
//     }
//   };

//   const handleSubmit = async () => {
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
//     formData.append('brandId', brandId); // Include brandId in the payload

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
//       const response = await axios.post(Api.productUploadedBySeller, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product uploaded successfully');
//       } else {
//         Alert.alert('Error', 'Failed to upload product');
//       }
//     } catch (error) {
//       console.error('Error uploading product:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to upload product');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Upload Product</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Item Info"
//         value={itemInfo}
//         onChangeText={setItemInfo}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Original Price"
//         value={originalPrice}
//         onChangeText={setOriginalPrice}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Selling Price"
//         value={sellingPrice}
//         onChangeText={setSellingPrice}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Color"
//         value={color}
//         onChangeText={setColor}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Size"
//         value={size}
//         onChangeText={setSize}
//       />

//       {/* Category Dropdown */}
//       <CategoryDropdown
//         selectedCategory={category}
//         onCategoryChange={(selectedCategory) => {
//           setCategory(selectedCategory);
//           setSubcategory('');
//           setSubtype('');
//         }}
//       />

//       {/* Subcategory Dropdown */}
//       {category && (
//         <SubCategoryDropdown
//           selectedSubCategory={subcategory}
//           onSubCategoryChange={(selectedSubCategory) => {
//             setSubcategory(selectedSubCategory);
//             setSubtype('');
//           }}
//           categoryId={category}
//         />
//       )}

//       {/* Subtype Dropdown */}
//       {subcategory && (
//         <TypesDropdown
//           selectedTypes={subtype}
//           onTypesChange={setSubtype}
//           subcategoryId={subcategory}
//         />
//       )}

//       <Text style={styles.label}>Upload Images (Max 2)</Text>
//       <View style={styles.imageContainer}>
//         {images.map((image, index) => (
//           <Image key={image} source={{ uri: image }} style={styles.image} />
//         ))}
//         {images.length < 2 && (
//           <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
//             <Text style={styles.addImageButtonText}>+</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
//   addImageButton: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//   },
//   addImageButtonText: {
//     fontSize: 30,
//     color: '#888',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default AddProduct;




import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import useSetTitle from '../../../hooks/useSetTitle';
import { AuthContext } from '../../../context/AuthContext';
import Api from '../../../service/Api';
import * as ImagePicker from 'expo-image-picker';

import { useLocalSearchParams } from 'expo-router';
import AddProductForm from './AddProductForm';

function AddProduct() {
  const { brandId } = useLocalSearchParams();

  useSetTitle('uploadProduct');
  const { token } = useContext(AuthContext);

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

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photo library to upload images.'
        );
      }
    })();
  }, []);

  const handleSubmit = async () => {
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
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('images', {
        uri: image,
        name: `image_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });

    try {
      const response = await axios.post(Api.productUploadedBySeller, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Product uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload product');
      }
    } catch (error) {
      console.error('Error uploading product:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to upload product');
    }
  };

  return (
    <AddProductForm
      title={title}
      setTitle={setTitle}
      itemInfo={itemInfo}
      setItemInfo={setItemInfo}
      description={description}
      setDescription={setDescription}
      originalPrice={originalPrice}
      setOriginalPrice={setOriginalPrice}
      sellingPrice={sellingPrice}
      setSellingPrice={setSellingPrice}
      color={color}
      setColor={setColor}
      size={size}
      setSize={setSize}
      category={category}
      setCategory={setCategory}
      subcategory={subcategory}
      setSubcategory={setSubcategory}
      subtype={subtype}
      setSubtype={setSubtype}
      images={images}
      setImages={setImages}
      handleSubmit={handleSubmit}
      brandId={brandId}
    />
  );
}

export default AddProduct;
