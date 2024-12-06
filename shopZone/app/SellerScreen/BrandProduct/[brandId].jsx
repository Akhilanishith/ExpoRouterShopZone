// import React, { useContext } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter hook
// import { AuthContext } from '../../../context/AuthContext';
// import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
// import Api from '../../../service/Api';
// import useSetTitle from '../../../hooks/useSetTitle';

// const BrandItem = () => {
//   useSetTitle('Your Brand Products');
//   const { token } = useContext(AuthContext);
//   const { brandId } = useLocalSearchParams(); // Get brandId from URL params
//   const router = useRouter(); // Initialize router for programmatic navigation

//   // Use custom hook to fetch seller products by brandId
//   const { data, loading, error } = useFetchCustomHook(`${Api.getSellerProduct}/${brandId}`, token);

//   // Render item for FlatList
//   const renderProductItem = ({ item }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: Api.main + item.images[0] }} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productTitle}>{item.title}</Text>
//         <Text>{item.description}</Text>
//         <Text style={styles.price}>₹{item.sellingPrice}</Text>
//       </View>
//     </View>
//   );

//   // Handle button click to navigate to SellerAddProduct screen
//   const handleUploadProduct = () => {
//     router.push(`../SellerAddProduct/${brandId}`); // Navigate to SellerAddProduct screen, passing the brandId as a query parameter
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     alert(error);
//   }

//   // No products state
//   const noProducts = !data || data.products.length === 0;

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {/* Only show upload button when there are no products */}
//         <TouchableOpacity style={styles.uploadButton} onPress={handleUploadProduct}>
//           <Text style={styles.uploadButtonText}>Upload Product</Text>
//         </TouchableOpacity>
//       </View>

//       {/* If no products, show a message, but still show the upload button */}
//       {noProducts ? (
//         <View style={styles.noProductsContainer}>
//           <Text>No products found for this brand.</Text>
//         </View>
//       ) : (
//         // List the products if available
//         <FlatList
//           data={data.products}
//           keyExtractor={(item) => item._id.toString()}
//           renderItem={renderProductItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   uploadButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 200,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   productCard: {
//     flexDirection: 'row',
//     marginBottom: 15,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   price: {
//     marginTop: 5,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   noProductsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
// });

// export default BrandItem;



import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AuthContext } from '../../../context/AuthContext';
import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
import Api from '../../../service/Api';
import { CirclePlus } from 'lucide-react-native';
import multiActionButton from '../../../hooks/multiActionAppBar';

const BrandItem = () => {
  // useSetTitle('Your Brand Products');
  const { token } = useContext(AuthContext);
  const { brandId } = useLocalSearchParams();
  const router = useRouter();

  const { data, loading, error } = useFetchCustomHook(`${Api.getSellerProduct}/${brandId}`, token);

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: Api.main + item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.price}>₹{item.sellingPrice}</Text>
      </View>
    </View>
  );

  // Function to navigate to the SellerAddProduct screen when the button is clicked
  const buttons = () => (
    <TouchableOpacity 
      style={styles.headerButtons} 
      onPress={() => router.push(`../SellerAddProduct/${brandId}`)} // Navigate to SellerAddProduct screen
    >
      <View style={styles.buttonContent}>
        <Text style={{ color: "#000000", marginRight: 4 }}>Product</Text>
        <CirclePlus color={"#000000"} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
  multiActionButton("Brands product", true, buttons)
  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    alert(error);
  }

  const noProducts = !data || data.products.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Use the buttons function for the Add Product button */}
        {/* {buttons()} */}
      </View>

      {noProducts ? (
        <View style={styles.noProductsContainer}>
          <Text>No products found for this brand.</Text>
        </View>
      ) : (
        <FlatList
          data={data.products}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderProductItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5, // Rounded corners for the button
    backgroundColor: "#F2F2F2", // Light gray background
    ...Platform.OS === "web" && {
    marginRight: 10, // Adjust for web
    }
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default BrandItem;
