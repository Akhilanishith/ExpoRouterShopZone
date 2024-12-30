// import React, { useState, useEffect, useContext, useMemo } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import axios from 'axios';

// import { AuthContext } from '../../context/AuthContext';
// import ProductCard from '../../components/ProductCard';
// import Api from '../../service/Api';


// export default function WishlistScreen() {
//   const { token } = useContext(AuthContext);

//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch wishlist data
//   const fetchWishlist = async () => {
//     try {
//       const response = await axios.get(Api.getWishlistAddedProducts, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlistItems(response.data.wishlist.items || []);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//       Alert.alert('Error', 'Failed to load wishlist.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // Handle remove from wishlist
//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const response = await axios.delete(Api.removeProductFromWishlist, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from wishlist successfully.');
//         setWishlistItems((prevItems) =>
//           prevItems.filter((item) => item.product_id !== productId)
//         );
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to remove product from wishlist.');
//       }
//     } catch (err) {
//       console.error('Error removing from wishlist:', err);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         {wishlistItems.length > 0 ? (
//           <View style={styles.wishlistContainer}>
//             {wishlistItems.map((item) => (
//               <View key={item.product_id} style={styles.wishlistItem}>
//                 <ProductCard
//                   product={{
//                     ...item,
//                     _id: item.product_id,
//                     images: item.images,
//                     title: item.title,
//                     sellingPrice: item.sellingPrice,
//                     originalPrice: item.originalPrice,
//                   }}
//                 />
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => handleRemoveFromWishlist(item.product_id)}
//                 >
//                   <Text style={styles.removeButtonText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View style={styles.emptyWishlistContainer}>
//             <Image
//               source={require('../../assets/images/your_cart_emptyy.webp')} // Use your empty wishlist image
//               style={styles.emptyWishlistImage}
//             />
//             <Text style={styles.emptyWishlistText}>Your wishlist is empty!</Text>
//             <TouchableOpacity
//               style={styles.shopNowButton}
//               onPress={() => router.push('./')}
//             >
//               <Text style={styles.shopNowText}>Shop Now</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   content: { padding: 16 },
//   loader: { marginTop: '50%' },
//   wishlistContainer: { flex: 1 },
//   wishlistItem: { marginBottom: 16 },
//   removeButton: {
//     marginTop: 8,
//     backgroundColor: '#ff0000',
//     paddingVertical: 8,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   emptyWishlistContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '80%',
//   },
//   emptyWishlistImage: {
//     width: 250,
//     height: 250,
//     marginBottom: 24,
//   },
//   emptyWishlistText: {
//     fontSize: 24,
//     color: '#120d0b',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   shopNowButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#f4511e',
//     borderRadius: 8,
//   },
//   shopNowText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from '../../context/AuthContext';
// import ProductCard from '../../components/ProductCard';
// import Api from '../../service/Api';
// import { router } from 'expo-router';

// export default function WishlistScreen() {
//   const { token } = useContext(AuthContext);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch wishlist data
//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(Api.getWishlistAddedProducts, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlistItems(response.data.wishlist.items || []);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//       Alert.alert('Error', 'Failed to load wishlist.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // Handle remove from wishlist
//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const response = await axios.delete(Api.removeProductFromWishlist, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from wishlist successfully.');
//         setWishlistItems((prevItems) =>
//           prevItems.filter((item) => item.product_id !== productId)
//         );
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to remove product from wishlist.');
//       }
//     } catch (err) {
//       console.error('Error removing from wishlist:', err);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         {wishlistItems.length > 0 ? (
//           <View style={styles.wishlistContainer}>
//             {wishlistItems.map((item) => (
//               <View key={item.product_id} style={styles.wishlistItem}>
//                 <ProductCard
//                   product={{
//                     ...item,
//                     _id: item.product_id,
//                     images: item.images,
//                     title: item.title,
//                     sellingPrice: item.sellingPrice,
//                     originalPrice: item.originalPrice,
//                   }}
//                   onWishlistUpdate={fetchWishlist} // Ensure UI syncs on update
//                 />
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => handleRemoveFromWishlist(item.product_id)}
//                 >
//                   <Text style={styles.removeButtonText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View style={styles.emptyWishlistContainer}>
//             <Image
//               source={require('../../assets/images/your_cart_emptyy.webp')}
//               style={styles.emptyWishlistImage}
//             />
//             <Text style={styles.emptyWishlistText}>Your wishlist is empty!</Text>
//             <TouchableOpacity
//               style={styles.shopNowButton}
//               onPress={() => router.push('./')}
//             >
//               <Text style={styles.shopNowText}>Shop Now</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   content: { padding: 16 },
//   loader: { marginTop: '50%' },
//   wishlistContainer: { flex: 1 },
//   wishlistItem: { marginBottom: 16 },
//   removeButton: {
//     marginTop: 8,
//     backgroundColor: '#ff0000',
//     paddingVertical: 8,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   emptyWishlistContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '80%',
//   },
//   emptyWishlistImage: {
//     width: 250,
//     height: 250,
//     marginBottom: 24,
//   },
//   emptyWishlistText: {
//     fontSize: 24,
//     color: '#120d0b',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   shopNowButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#f4511e',
//     borderRadius: 8,
//   },
//   shopNowText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


// import React, { useContext } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import Api from "../../service/Api";
// import WishlistComponent from "./WishlistComponent"; // Import WishlistComponent
// import { AuthContext } from "../../context/AuthContext";

// const WishlistScreen = () => {
//   const { token } = useContext(AuthContext);
//   const router = useRouter();

//   if (!token) {
//     Alert.alert("Not Authenticated", "Please log in to view your wishlist.");
//     router.push("../AuthScreen/AuthScreen");
//     return null;
//   }

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const response = await axios.delete(Api.removeProductFromWishlist, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert("Success", "Product removed from wishlist successfully.");
//       } else {
//         Alert.alert("Error", response.data.message || "Failed to remove product.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My Wishlist</Text>
//       <WishlistComponent token={token} onRemoveItem={handleRemoveFromWishlist} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
// });

// export default WishlistScreen;



import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard';
import Api from '../../service/Api';
import { router } from 'expo-router';

export default function WishlistScreen() {
  const { token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isWeb = width > 768; // Breakpoint for responsive design

 // Fetch wishlist data
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Api.getWishlistAddedProducts, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(response.data.wishlist.items || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Alert.alert('Error', 'Failed to load wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(Api.removeProductFromWishlist, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Product removed from wishlist successfully.');
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId)
        );
      } else {
        Alert.alert('Error', response.data.message || 'Failed to remove product from wishlist.');
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {wishlistItems.length > 0 ? (
        <View style={[styles.wishlistContainer, isWeb && styles.webWishlistContainer]}>
          {wishlistItems.map((item) => (
            <View key={item.product_id} style={[styles.wishlistItem, isWeb && styles.webWishlistItem]}>
              <ProductCard
                product={{
                  ...item,
                  _id: item.product_id,
                  images: item.images,
                  title: item.title,
                  sellingPrice: item.sellingPrice,
                  originalPrice: item.originalPrice,
                }}
                onWishlistUpdate={fetchWishlist}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromWishlist(item.product_id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyWishlistContainer}>
          <Image
            source={require('../../assets/images/your_cart_emptyy.webp')}
            style={styles.emptyWishlistImage}
          />
          <Text style={styles.emptyWishlistText}>Your wishlist is empty!</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => router.push('./')}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
 
 removeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    width: '40%',
    borderRadius: 4,
    marginLeft: 8,
  },
removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
},
  emptyWishlistContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWishlistImage: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  emptyWishlistText: {
    fontSize: 24,
    textAlign: 'center',
  },
  shopNowButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4081',
    borderRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },




  wishlistContainer: {
    flexDirection: 'column', // Default column stacking for mobile
},
webWishlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20, // Add consistent spacing between rows and columns
},
wishlistItem: {
    width: '100%', // Full width for mobile
},
webWishlistItem: {
    width: '30%', // Adjust width for 3-column grid layout on web
},
});



