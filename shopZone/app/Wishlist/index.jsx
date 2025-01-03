// import React, { useContext, useEffect, useState } from 'react';
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
// import ProductCard from '../../components/ProductCard';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { router } from 'expo-router';
// import { AuthContext } from '../../context/AuthContext';

// export default function WishlistScreen() {
//   const [ wishlist, setWishlist ] = useState([]);
//   const { token } = useContext(AuthContext); // Get the user's authentication token

//   // Fetch wishlist data from API
//   const { data, loading, error } = useFetchCustomHook(`${Api.getWishlistAddedProducts}`, token);

//   useEffect(() => {
//     if (data?.products) {
//       setWishlist(data.products); // Initialize the wishlist in context
//     }
//   }, [data]);

//   const handleRemoveFromWishlist = (productId) => {
//     setWishlist((prevProducts) =>
//       prevProducts.filter((product) => product._id !== productId)
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     Alert.alert("Error", error.message || "An error occurred while fetching the wishlist.");
//     return null;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {wishlist.length > 0 ? (
//         <View style={styles.cardContainer}>
//           {wishlist.map((item) => (
//             <ProductCard key={item.id} 
//              product={item}
//              removeFromWishlist={handleRemoveFromWishlist}/>
//           ))}
//         </View>
//       ) : (
//         <View style={styles.emptyWishlistContainer}>
//           <Image
//             source={require('../../assets/images/your_cart_emptyy.webp')}
//             style={styles.emptyWishlistImage}
//           />
//           <Text style={styles.emptyWishlistText}>Your wishlist is empty!</Text>
//           <TouchableOpacity
//             style={styles.shopNowButton}
//             onPress={() => router.push('./')}
//           >
//             <Text style={styles.shopNowText}>Shop Now</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   cardContainer: {
//     padding: 10,
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 15,
//   },
//   emptyWishlistContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   emptyWishlistImage: {
//     width: 250,
//     height: 250,
//     marginBottom: 24,
//   },
//   emptyWishlistText: {
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   shopNowButton: {
//     marginTop: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#ff4081',
//     borderRadius: 8,
//   },
//   shopNowText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import Api from '../../service/Api';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import { router } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(AuthContext); // Get the user's authentication token

  const { data, loading, error } = useFetchCustomHook(`${Api.getWishlistAddedProducts}`, token);

  useEffect(() => {
    if (data?.products) {
      setWishlist(data.products); // Initialize the wishlist in context
    }
  }, [data]);

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    Alert.alert("Error", error.message || "An error occurred while fetching the wishlist.");
    return null;
  }

  if (!wishlist.length) {
    return (
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
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {wishlist.map((item) => (
          <ProductCard
            key={item._id || item.id} // Use _id or id as the unique key
            product={item}
            removeFromWishlist={handleRemoveFromWishlist}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  cardContainer: {
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
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
});