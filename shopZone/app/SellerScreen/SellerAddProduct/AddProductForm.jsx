// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Platform,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import CategoryDropdown from '../../../components/CategoryDropdown';
// import SubCategoryDropdown from '../../../components/SubCategoryDropdown';
// import TypesDropdown from '../../../components/TypesDropdown';

// const AddProductForm = ({
//   title,
//   setTitle,
//   itemInfo,
//   setItemInfo,
//   description,
//   setDescription,
//   originalPrice,
//   setOriginalPrice,
//   sellingPrice,
//   setSellingPrice,
//   color,
//   setColor,
//   size,
//   setSize,
//   category,
//   setCategory,
//   subcategory,
//   setSubcategory,
//   subtype,
//   setSubtype,
//   images,
//   setImages,
//   handleSubmit,
// }) => {
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
//       if (Platform.OS === 'web') {
//         const response = await fetch(result.uri);
//         const blob = await response.blob();
//         const blobUrl = URL.createObjectURL(blob);
//         console.log('Web image URL:', blobUrl); // Add this
//         setImages([...images, blobUrl]);
//       } else {
//         const newImageUri = result.assets?.[0]?.uri;
//         console.log('Native image URI:', newImageUri); // Add this
//         if (newImageUri) {
//           setImages([...images, newImageUri]);
//         }
//       }
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
//         style={styles.descriptionInput}
//         placeholder="Description (Longer Text Allowed)"
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

//       <CategoryDropdown
//         selectedCategory={category}
//         onCategoryChange={(selectedCategory) => {
//           setCategory(selectedCategory);
//           setSubcategory('');
//           setSubtype('');
//         }}
//       />

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

//       {subcategory && (
//         <TypesDropdown
//           selectedTypes={subtype}
//           onTypesChange={setSubtype}
//           subcategoryId={subcategory}
//         />
//       )}

//       <Text style={styles.label}>Upload Images (Max 2)</Text>

//       <View style={styles.imageContainer}>
//       {images.map((image, index) => (
//   <Image 
//     key={index}
//     source={{ uri: image }}
//     style={styles.image}
//     onError={(error) => console.log('Image loading error:', error)}
//   />
// ))}
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
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   input: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//   },
//   descriptionInput: {
//     height: 80,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//     textAlignVertical: 'top',
//     borderRadius: 5,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 20,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     margin: 5,
//     resizeMode: 'cover', // Add this
//   },
//   addImageButton: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//     borderRadius: 5,
//   },
//   addImageButtonText: {
//     fontSize: 24,
//     color: '#888',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddProductForm;
