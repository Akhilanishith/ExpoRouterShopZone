// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
// import ProductCard from "../../components/ProductCard"; // Adjust path if needed
// import axios from "axios";
// import Api from "../../service/Api";

// const WishlistComponent = ({ token, onRemoveItem }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(Api.getWishlistAddedProducts, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlistItems(response.data.products || []);
//     } catch (error) {
//       Alert.alert("Error", "Failed to load wishlist.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   if (loading) {
//     return <Text style={styles.loadingText}>Loading...</Text>;
//   }

//   if (wishlistItems.length === 0) {
//     return <Text style={styles.emptyText}>Your wishlist is empty!</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {wishlistItems.map((item) => (
//         <View key={item._id} style={styles.wishlistItem}>
//           <ProductCard product={item} />
//           <TouchableOpacity
//             style={styles.removeButton}
//             onPress={() => {
//               onRemoveItem(item._id);
//               setWishlistItems((prevItems) =>
//                 prevItems.filter((wishlistItem) => wishlistItem._id !== item._id)
//               );
//             }}
//           >
//             <Text style={styles.removeButtonText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   wishlistItem: {
//     marginBottom: 16,
//   },
//   removeButton: {
//     backgroundColor: "#f44336",
//     padding: 8,
//     borderRadius: 4,
//     marginTop: 8,
//   },
//   removeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   loadingText: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//     color: "gray",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//     color: "gray",
//   },
// });

// export default WishlistComponent;
