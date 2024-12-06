
// import React, { useContext, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import Api from '../../../service/Api';
// import multiActionButton from '../../../hooks/multiActionAppBar';
// import { CirclePlusIcon } from 'lucide-react-native';
// import { AuthContext } from '../../../context/AuthContext';
// import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
// import { ActivityIndicator } from 'react-native-web';

// const SellerProductsScreen = () => {

//   const { token } = useContext(AuthContext);
//   const { brandId } = useLocalSearchParams();
//   const router = useRouter();

//   const { data, loading, error } = useFetchCustomHook(`${Api.getSellerAllBrandProduct}/${brandId}`, token);
//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     alert(error);
//   }

//   const [products, setProducts] = useState([
//     { id: '1', name: 'Wireless Earbuds', price: 79.99, stock: 50, image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSPvXk7i8IQCW41C__jIapq8bPzO9b1q3S_mPjRYX0w3_H3MNX5nkhywpb91vkHTil-mDp1eaSygvR9_Fqz8Ezj5lJM6R_QZtbTuz9TqJilhbtvqIj9BO07BuY' },
//     { id: '2', name: 'Smart Watch', price: 199.99, stock: 30, image: 'https://justintime.in/cdn/shop/products/A832_1.jpg' },
//     { id: '3', name: 'Bluetooth Speaker', price: 59.99, stock: 75, image: 'https://example.com/speaker.jpg' },
//     { id: '4', name: 'Laptop Stand', price: 29.99, stock: 100, image: 'https://example.com/laptopstand.jpg' },
//     { id: '5', name: 'Phone Case', price: 19.99, stock: 200, image: 'https://example.com/phonecase.jpg' },
//     { id: '6', name: 'Smart Home Thermostat', price: 99.99, stock: 150, image: 'https://example.com/thermostat.jpg' },
//     { id: '7', name: 'Smart Home Switch', price: 49.99, stock: 250, image: 'https://example.com/smartswitch.jpg' },
//   ]);

//   const renderProductItem = ({ item }) => (
//     <View style={styles.productItem}>
//        <Image source={{ uri: Api.main + item.images[0] }} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//         <Text style={styles.productStock}>In Stock: {item.stock}</Text>
//       </View>
//       <TouchableOpacity 
//         style={styles.editButton}
//         onPress={() => router.push(`/${item.id}`)}
//       >
//         <Ionicons name="create-outline" size={24} color="#4a90e2" />
//       </TouchableOpacity>
//     </View>
//   );

//   // Replacing Add Button with custom buttons implementation
//   const buttons = () => (
//     <TouchableOpacity 
//       style={styles.headerButtons} 
//       onPress={() => router.push(`../SellerAddProduct/${brandId}`)} // Navigate to SellerAddProduct screen
//     >
//       <View style={styles.buttonContent}>
//         <Text style={{ color: "#000000", marginRight: 4 }}>Add Product</Text>
//         <CirclePlusIcon color={"#000000"} style={styles.icon} />
//       </View>
//     </TouchableOpacity>
//   );

//   multiActionButton("List product", true, buttons); // Render buttons

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//       </View>
//       <FlatList
//         data={products}
//         renderItem={renderProductItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.productList}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },

//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   productList: {
//     padding: 10,
//   },
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 15,
//     resizeMode: "contain",
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: '#4a90e2',
//     marginTop: 5,
//   },
//   productStock: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   editButton: {
//     padding: 5,
//   },
//   headerButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 5,
//     borderRadius: 5, // Rounded corners for the button
//     backgroundColor: "#F2F2F2", // Light gray background
//     ...Platform.OS === "web" && {
//       marginRight: 20,
//     }
    
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginLeft: 5,
//   },
// });

// export default SellerProductsScreen;



import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Api from '../../../service/Api';
import multiActionButton from '../../../hooks/multiActionAppBar';
import { CirclePlusIcon } from 'lucide-react-native';
import { AuthContext } from '../../../context/AuthContext';
import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
import { ActivityIndicator } from 'react-native-web';

const SellerProductsScreen = () => {
  const { token } = useContext(AuthContext);
  const { brandId } = useLocalSearchParams();
  const router = useRouter();

  // Fetch all products for all brands created by the seller
  const { data, loading, error } = useFetchCustomHook(`${Api.getSellerAllBrandProduct}`, token);

  // Define buttons for the header
  const renderHeaderButtons = () => (
    <TouchableOpacity 
      style={styles.headerButtons} 
      // onPress={() => router.push(`../SellerAddProduct/[brandId]`)} // Navigate to the add product screen
      // onPress={() => router.push(`../SellerAddProduct/[brandId]${brandId}`)} 
      onPress={() => router.push(`./[brandId]`)}
    >
      <View style={styles.buttonContent}>
        <Text style={{ color: "#000000", marginRight: 4 }}>Add Product</Text>
        <CirclePlusIcon color={"#000000"} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  // Call multiActionButton unconditionally
  multiActionButton("All Products", true, renderHeaderButtons);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    alert(error);
    return null; // Stop rendering if there's an error
  }

  const noProducts = !data || data.products.length === 0;

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: Api.main + item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.productPrice}>₹{item.sellingPrice.toFixed(2)}</Text>
        <Text style={styles.productStock}>In Stock: {item.stock}</Text>
      </View>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => router.push(`/product/${item._id}`)} // Navigate to edit product screen
      >
        <Ionicons name="create-outline" size={24} color="#4a90e2" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {noProducts ? (
        <View style={styles.noProductsContainer}>
          <Text>No products found for your brands.</Text>
        </View>
      ) : (
        <FlatList
          data={data.products} // Use fetched products here
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id.toString()} // Ensure this matches your product data structure
          contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  productList: {
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "contain",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#4a90e2',
    marginTop: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  editButton: {
    padding: 5,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    ...Platform.OS === "web" && {
      marginRight: 20,
    }
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
});

export default SellerProductsScreen;
