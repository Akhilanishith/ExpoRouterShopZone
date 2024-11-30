



// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { AuthContext } from '../../../context/AuthContext';
// import Api from '../../../service/Api';
// import CategoryDropdown from '../../../components/CategoryDropdown';
// import SubCategoryDropdown from '../../../components/SubCategoryDropdown';
// import TypesDropdown from '../../../components/TypesDropdown';
// import { useLocalSearchParams } from 'expo-router';
// import useSetTitle from '../../../hooks/useSetTitle';

// const AddProduct = () => {
//   useSetTitle('Add Product');
//   const { token } = useContext(AuthContext);
//   const { brandId } = useLocalSearchParams();

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

//   // Image picker function
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
//       const selectedImage = result.assets?.[0];
//       const newImageUri = selectedImage?.uri;

//       if (Platform.OS === 'web') {
//         // Web-specific image handling
//         if (newImageUri) {
//           const file = await fetch(newImageUri)
//             .then((res) => res.blob())
//             .then((blob) => new File([blob], selectedImage?.fileName, { type: blob.type }));

//           // Append the file object to images array
//           setImages([...images, file]);
//         } else {
//           Alert.alert('Error', 'Failed to retrieve image URI');
//         }
//       } else {
//         // Android-specific image handling (local URI)
//         if (newImageUri) {
//           setImages([...images, newImageUri]);
//         } else {
//           Alert.alert('Error', 'Failed to retrieve image URI');
//         }
//       }
//     }
//   };

//   // Submit form
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
//     formData.append('brandId', brandId);

//     // Append image files for both Android and Web
//     images.forEach((image, index) => {
//       if (Platform.OS === 'web') {
//         // Web uploads File object
//         formData.append('images', image, image.name); // Append file with its name
//       } else {
//         // Android uploads local file URI
//         const uriParts = image.split('.');
//         const fileType = uriParts[uriParts.length - 1];
//         formData.append('images', {
//           uri: image,
//           name: `image_${index}.${fileType}`,
//           type: `image/${fileType}`,
//         });
//       }
//     });

//     try {
//       const response = await axios.post(Api.productUploadedBySeller, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         Alert.alert(response.data.message);
//       } else {
//         Alert.alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error.response || error.message);
//       Alert.alert('Error', 'Failed to add product.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
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
//         {images.map((image, index) => (
//           <Image
//             key={index}
//             source={{ uri: Platform.OS === 'web' ? URL.createObjectURL(image) : image }}
//             style={styles.image}
//             resizeMode="cover"
//           />
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
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
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

// export default AddProduct;



import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import Api from '../../../service/Api';
import CategoryDropdown from '../../../components/CategoryDropdown';
import SubCategoryDropdown from '../../../components/SubCategoryDropdown';
import TypesDropdown from '../../../components/TypesDropdown';
import { useLocalSearchParams } from 'expo-router';
import useSetTitle from '../../../hooks/useSetTitle';

const AddProduct = () => {
  useSetTitle('Add Product');
  const { token } = useContext(AuthContext);
  const { brandId } = useLocalSearchParams();

  // State variables for form fields
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
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Error states for form validation
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    originalPrice: '',
    sellingPrice: '',
    category: '',
    images: '',
  });

  // Image picker function
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
        if (newImageUri) {
          const file = await fetch(newImageUri)
            .then((res) => res.blob())
            .then((blob) => new File([blob], selectedImage?.fileName, { type: blob.type }));
          setImages([...images, file]);
        }
      } else {
        if (newImageUri) {
          setImages([...images, newImageUri]);
        }
      }
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!title) {
      newErrors.title = 'Please enter a title.';
      isValid = false;
    }
    if (!description) {
      newErrors.description = 'Please enter a description.';
      isValid = false;
    }
    if (!originalPrice || isNaN(originalPrice) || originalPrice <= 0) {
      newErrors.originalPrice = 'Please enter a valid original price.';
      isValid = false;
    }
    if (!sellingPrice || isNaN(sellingPrice) || sellingPrice <= 0) {
      newErrors.sellingPrice = 'Please enter a valid selling price.';
      isValid = false;
    }
    if (!category) {
      newErrors.category = 'Please select a category.';
      isValid = false;
    }
    if (images.length === 0) {
      newErrors.images = 'Please upload at least one image.';
      isValid = false;
    }

    setErrors(newErrors); // Set the error messages
    return isValid;
  };

  // Submit form
  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions

    setIsSubmitted(true);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      setIsSubmitted(false);
      return; // Exit if validation fails
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
        formData.append('images', image, image.name);
      } else {
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

      setLoading(false);
      setIsSubmitted(false);

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        resetForm();
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setIsSubmitted(false);
      console.error('Error:', error.response || error.message);
      Alert.alert('Error', 'Failed to add product.');
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setItemInfo('');
    setDescription('');
    setOriginalPrice('');
    setSellingPrice('');
    setColor('');
    setSize('');
    setCategory('');
    setSubcategory('');
    setSubtype('');
    setImages([]);
    setErrors({});
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={[styles.input, errors.title ? styles.errorInput : null]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, errors.description ? styles.errorInput : null]}
        placeholder="Item Info"
        value={itemInfo}
        onChangeText={setItemInfo}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput
        style={[styles.descriptionInput, errors.description ? styles.errorInput : null]}
        placeholder="Description (Longer Text Allowed)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput
        style={[styles.input, errors.originalPrice ? styles.errorInput : null]}
        placeholder="Original Price"
        value={originalPrice}
        onChangeText={setOriginalPrice}
        keyboardType="numeric"
      />
      {errors.originalPrice && <Text style={styles.errorText}>{errors.originalPrice}</Text>}

      <TextInput
        style={[styles.input, errors.sellingPrice ? styles.errorInput : null]}
        placeholder="Selling Price"
        value={sellingPrice}
        onChangeText={setSellingPrice}
        keyboardType="numeric"
      />
      {errors.sellingPrice && <Text style={styles.errorText}>{errors.sellingPrice}</Text>}

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
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

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
            source={{ uri: Platform.OS === 'web' ? URL.createObjectURL(image) : image }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}

        {images.length < 2 && (
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <Text style={styles.addImageButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitButtonText}>Submit</Text>}
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
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
