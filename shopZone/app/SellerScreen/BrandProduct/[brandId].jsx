// import { View, Text } from 'react-native'
// import React, { useContext } from 'react'
// import { AuthContext } from '../../../context/AuthContext';
// import { useLocalSearchParams } from 'expo-router';
// import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
// import { ActivityIndicator } from 'react-native';
// import Api from '../../../service/Api';

// const BrandItem = () => {
//     const { token } = useContext(AuthContext);
//     const { brandId } = useLocalSearchParams();
//     const { data, loading, error } = useFetchCustomHook(Api.getSellerProduct)

//     const product = [{

//     }]

//     if (loading) {
//         return <ActivityIndicator />
//     }
//     if (error) {
//         return <View><Text>{error}</Text></View>
//     }
//     return (
//         <View>
//             <Text>BrandItem</Text>
//         </View>
//     )
// }

// export default BrandItem

// //../SellerAddProduct/${brandId}
// import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
// import { useLocalSearchParams } from 'expo-router';
// import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
// import Api from '../../../service/Api';

// const BrandItem = () => {
//   const { token } = useContext(AuthContext);
//   const { brandId } = useLocalSearchParams(); // Get brandId from URL params

//   // Use custom hook to fetch seller products by brandId
//   const { data, loading, error } = useFetchCustomHook(`${Api.getSellerProduct}/${brandId}`, token);

//   // Render item for FlatList
//   const renderProductItem = ({ item }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: Api.main + item.images[0] }} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productTitle}>{item.title}</Text>
//         <Text>{item.description}</Text>
//         <Text style={styles.price}>${item.sellingPrice}</Text>
//       </View>
//     </View>
//   );

//   // Loading state
//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (error) {
//     alert(error);
//   }

//   // No products state
//   if (!data || data.products.length === 0) {
//     return <View><Text>No products found for this brand.</Text></View>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Products for this Brand</Text>

//       {/* List the products */}
//       <FlatList
//         data={data.products}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={renderProductItem}
//       />
//     </View>
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
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
// });

// export default BrandItem;
import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter hook
import { AuthContext } from '../../../context/AuthContext';
import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
import Api from '../../../service/Api';

const BrandItem = () => {
  const { token } = useContext(AuthContext);
  const { brandId } = useLocalSearchParams(); // Get brandId from URL params
  const router = useRouter(); // Initialize router for programmatic navigation

  // Use custom hook to fetch seller products by brandId
  const { data, loading, error } = useFetchCustomHook(`${Api.getSellerProduct}/${brandId}`, token);

  // Render item for FlatList
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

  // Handle button click to navigate to SellerAddProduct screen
  const handleUploadProduct = () => {
    router.push(`../SellerAddProduct/${brandId}`);// Navigate to SellerAddProduct screen, passing the brandId as a query parameter
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }
  if (error) {
    alert(error);
  }

  // No products state
  if (!data || data.products.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No products found for this brand.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Products of this Brand</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadProduct}>
          <Text style={styles.uploadButtonText}>Upload Product</Text>
        </TouchableOpacity>
      </View>

      {/* List the products */}
      <FlatList
        data={data.products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderProductItem}
      />
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
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
});

export default BrandItem;

