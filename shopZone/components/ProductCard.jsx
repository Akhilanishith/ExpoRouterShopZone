
// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Link, useRouter } from 'expo-router';
// import Api from '../service/Api';

// const ProductCard = ({ product }) => {
//     const router = useRouter();

 
    
//     return (
//         <TouchableOpacity onPress={() => router.push(`/itemDetail/${product._id}`)} style={styles.card}>
            // <View>
            //     <Image source={{ uri: Api.main + product.images[0] }} style={styles.image} />
            // </View>
//             <View style={styles.cardContent}>
//                 <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
//                 <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//                     {product.description}
//                 </Text>
//                 {/* <Text style={styles.info} numberOfLines={3} ellipsizeMode="tail">
//                     {product.itemInfo}
//                 </Text> */}
//                 <View style={styles.priceContainer}>
//   <Text style={styles.sellingPrice}>₹{product.sellingPrice.toFixed(2)}</Text>
//   <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
// </View>

//                 <View style={styles.ratingContainer}>
//                     <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
    
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         overflow: 'hidden',
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: 160,
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         maxWidth: 200,
//     },
//     image: {
//         width: '100%',
//         height: 150,
//         resizeMode: 'center',
//     },
//     cardContent: {
//         padding: 12,
//     },
//     name: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 8,
//     },
//    priceContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 8,
//   gap: 8, // Space between prices
// },
// sellingPrice: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   color: '#4CAF50', // Green for the discounted price
// },
// originalPrice: {
//   fontSize: 16,
//   color: '#888', // Grey color for the original price
//   textDecorationLine: 'line-through', // Strike-through style
// },

//     ratingContainer: {
//         marginTop: 8,
//     },
//     rating: {
//         fontSize: 14,
//         color: '#ff5900',
//     },
// });

// export default ProductCard;



// import React, { useContext, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { Link, useRouter } from 'expo-router';
// import Api from '../service/Api';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
// import axios from 'axios'; // Ensure axios is imported
// import { AuthContext } from '../context/AuthContext';

// const ProductCard = ({ product ,removeFromWishlist }) => {
//     const { token } = useContext(AuthContext);
//     const router = useRouter();
//     const [isWishlisted, setWishlisted] = useState(product.isWishlisted);

//     const toggleWishlist = async () => {
//         if (!token) {
//             // Redirect to AuthScreen if user is not authenticated
//             router.push({
//                 pathname: '../AuthScreen/AuthScreen',
//             });
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 Api.toggleWishlistApi,
//                 { productId: product._id },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.data.success) {
//                 setWishlisted(!isWishlisted); // Toggle wishlist state
//                 if (typeof removeFromWishlist === 'function') {
//                     removeFromWishlist(product._id);
//                 }
//                 Alert.alert(
//                     'Success',
//                     isWishlisted
//                         ? 'Item removed from wishlist successfully.'
//                         : 'Item added to wishlist successfully.'
//                 );
//             } else {
//                 Alert.alert('Error', response.data.message || 'Failed to update wishlist.');
//             }
//         } catch (err) {
//             Alert.alert('Error', 'Something went wrong. Please try again.');
//         }
//     };

//     return (
//         <TouchableOpacity onPress={() => router.push(`/itemDetail/${product._id}`)} style={styles.card}>
//             <View>
//                 <Image source={{ uri: Api.main + product?.images[0] }} style={styles.image} />
//                 <TouchableOpacity onPress={toggleWishlist} style={styles.wishlistIcon}>
//                     <Icon
//                         name={isWishlisted ? 'favorite' : 'favorite-border'}
//                         size={24}
//                         color={isWishlisted ? '#ff0000' : '#888'}
//                     />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.cardContent}>
//                 <Text style={styles.name} numberOfLines={2}>
//                     {product.title}
//                 </Text>
//                 <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//                     {product.description}
//                 </Text>
//                 <View style={styles.priceContainer}>
//                     <Text style={styles.sellingPrice}>₹{product.sellingPrice.toFixed(2)}</Text>
//                     <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
//                 </View>
//                 <View style={styles.ratingContainer}>
//                     <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         overflow: 'hidden',
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: 160,
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         maxWidth: 200,
//         // position: 'relative',
//     },

//     image: {
//         width: '100%',
//         height: 150,
//         resizeMode: 'center',
//     },
   
      
//     wishlistIcon: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         borderRadius: 20,
//         padding: 4,
//     },
//     cardContent: {
//         padding: 12,
//     },
//     name: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 8,
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//         gap: 8,
//     },
//     sellingPrice: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#4CAF50',
//     },
//     originalPrice: {
//         fontSize: 16,
//         color: '#888',
//         textDecorationLine: 'line-through',
//     },
//     ratingContainer: {
//         marginTop: 8,
//     },
//     rating: {
//         fontSize: 14,
//         color: '#ff5900',
//     },
// });

// export default ProductCard;


import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Api from '../service/Api';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import axios from 'axios'; // Ensure axios is imported
import { AuthContext } from '../context/AuthContext';
const ProductCard = ({ product, removeFromWishlist }) => {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const [isWishlisted, setWishlisted] = useState(product.isWishlisted);
  
    const toggleWishlist = async () => {
      if (!token) {
        router.push({ pathname: '../AuthScreen/AuthScreen' });
        return;
      }
  
      try {
        const response = await axios.post(
          Api.toggleWishlistApi,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.data.success) {
          setWishlisted(!isWishlisted);
          if (typeof removeFromWishlist === 'function') {
            removeFromWishlist(product._id);
          }
        } else {
          Alert.alert('Error', response.data.message || 'Failed to update wishlist.');
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    };
  
    return (
      <TouchableOpacity onPress={() => router.push(`/itemDetail/${product._id}`)} style={styles.card}>
        <Image source={{ uri: Api.main + product?.images[0] }} style={styles.image} />
        <TouchableOpacity onPress={toggleWishlist} style={styles.wishlistIcon}>
          <Icon
            name={isWishlisted ? 'favorite' : 'favorite-border'}
            size={24}
            color={isWishlisted ? '#ff0000' : '#888'}
          />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{product.title}</Text>
          {/* <Text style={styles.description}>{product.description}</Text> */}
          <View style={styles.priceContainer}>
            <Text style={styles.sellingPrice}>₹{product.sellingPrice.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
          </View>
          <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 160,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: 200,
        padding:8,
        // position: 'relative',
    },

    image: {
        width: '100%',
        height: 150,
        resizeMode: 'center',
      borderRadius: 8,
    },
   
      
    wishlistIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 4,
    },
    cardContent: {
      paddingVertical:10
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    sellingPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    originalPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
    },
    ratingContainer: {
        marginTop: 8,
    },
    rating: {
        fontSize: 12,
        color: '#ff5900',
    },
});
  export default ProductCard;