

// import React, { useState, useContext, useEffect } from 'react';
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
// import { router, Stack } from 'expo-router';
// import axios from 'axios';
// import useSetTitle from '../../hooks/useSetTitle';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AuthContext } from '../../context/AuthContext';
// import CartItemList from './CartItemList';

// export default function CartScreen() {
//   const { token } = useContext(AuthContext);

//   // Fetch data with custom hook
//   const { data, loading, error} = useFetchCustomHook(Api.getCartAddedProduct, token);

//   // State for cart items
//   const [cartItems, setCartItems] = useState([]);

//   // Sync local cartItems state with fetched data
//   useEffect(() => {
//     if (data?.cart?.items) {
//       setCartItems(data.cart.items);
//     }
//   }, [data]);


//   // Handle removal of item from cart
//   const handleRemoveFromCart = async (productId) => {
//     console.log(productId)
//     try {
//       // Optimistically update the UI by filtering out the item
   

//       // Make API call to remove the item
//       const response = await axios.delete(Api.removeProductFromCart, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from cart successfully.');
//         setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
//       } else {
//         // Revert UI update on failure
//         setCartItems(data?.cart?.items || []);
//         Alert.alert('Error', response.data.message || 'Failed to remove product from cart.');
//       }
//     } catch (err) {
//       // Revert UI update on error
//       setCartItems(data?.cart?.items || []);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
//   }



//   return (
//     <>
//       {/* <ScrollView style={styles.container}>
//         <View style={styles.content}>

//           {cartItems.length > 0 ? (
//             <CartItemList cartItems={cartItems} onRemove={handleRemoveFromCart} />
//           ) : (
//             <Text style={styles.emptyCartText}>Your cart is empty</Text>
//           )}

//           {cartItems.length > 0 && (
//             <View style={styles.priceDetailsCard}>
//               <Text style={styles.heading}>PRICE DETAILS</Text>

//             </View>
//           )}
//         </View>
//       </ScrollView> */}
//       <ScrollView style={styles.container}>
//         <View style={styles.content}>
//           {cartItems.length > 0 ? (
//             <CartItemList cartItems={cartItems} onRemove={handleRemoveFromCart} />
//           ) : (
//             <View style={styles.emptyCartContainer}>
//               <Image 
//                 source={require('../../assets/images/your_cart_empty.webp')} // Update with the correct path to your image
//                 style={styles.emptyCartImage}
//               />
//               <Text style={styles.emptyCartText}>Add ITEMS Now</Text>
//               <TouchableOpacity
//               style={styles.shopNowButton}
//               onPress={() => router.push('./')} // Navigate to /userTabs using Expo Router
//             >
//               <Text style={styles.shopNowText}>Shop Now</Text>
//             </TouchableOpacity>
//             </View>
//           )}

//           {cartItems.length > 0 && (
//             <View style={styles.priceDetailsCard}>
//               <Text style={styles.heading}>PRICE DETAILS</Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   content: { padding: 16 },
//   loader: { marginTop: '50%' },
//   progressSteps: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
//   activeStep: { color: '#007AFF', fontWeight: '500', marginHorizontal: 16 },
//   inactiveStep: { color: '#666666', marginHorizontal: 16 },
//   priceDetailsCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   priceDetails: { marginVertical: 8 },
//   priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   priceLabel: { fontSize: 14, color: '#666' },
//   priceValue: { fontSize: 14, color: '#333' },
//   separator: { borderBottomWidth: 1, borderColor: '#ddd', marginVertical: 8 },
//   savings: { fontSize: 14, color: '#4CAF50', marginTop: 8 },
//   primaryButton: { backgroundColor: '#f4511e', padding: 16, borderRadius: 4, alignItems: 'center', marginTop: 16 },
//   primaryButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
//   emptyCartText: { textAlign: 'center', fontSize: 18, color: '#666', marginVertical: 20 },
//   discount: { color: '#FF5722' },
//   free: { color: '#4CAF50' },


//   emptyCartContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '80vh', // Takes up most of the viewport height
//   },
//   emptyCartImage: {
//     width: 250, // Slightly larger image for web
//     height: 250,
//     marginBottom: 24,
//   },
//   emptyCartText: {
//     fontSize: 24, // Larger font size for better readability
//     color: '#120d0b', // Matches the theme color
//     textAlign: 'center',
//     fontWeight: '500', // Adds a bit more weight for web text
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


// import React, { useState, useContext, useEffect, useMemo } from 'react';
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
// import { router } from 'expo-router';
// import axios from 'axios';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AuthContext } from '../../context/AuthContext';
// import CartItemList from './CartItemList';
// import PriceDetails from './PriceDetails';

// export default function CartScreen() {
//   const { token } = useContext(AuthContext);

//   // Fetch data with custom hook
//   const { data, loading, error } = useFetchCustomHook(Api.getCartAddedProduct, token);

//   // State for cart items
//   const [cartItems, setCartItems] = useState([]);

//   // Sync local cartItems state with fetched data
//   useEffect(() => {
//     if (data?.cart?.items) {
//       setCartItems(data.cart.items);
//     }
//   }, [data]);

//   // Handle removal of item from cart
//   const handleRemoveFromCart = async (productId) => {
//     console.log(productId);
//     try {
//       const response = await axios.delete(Api.removeProductFromCart, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from cart successfully.');
//         setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
//       } else {
//         setCartItems(data?.cart?.items || []);
//         Alert.alert('Error', response.data.message || 'Failed to remove product from cart.');
//       }
//     } catch (err) {
//       setCartItems(data?.cart?.items || []);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   // Calculate price details
//   const totalPrice = useMemo(
//     () => cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0),
//     [cartItems]
//   );

//   const totalSellingPrice = useMemo(
//     () => cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0),
//     [cartItems]
//   );

//   const totalDiscount = useMemo(
//     () => totalPrice - totalSellingPrice,
//     [totalPrice, totalSellingPrice]
//   );

//   const totalCouponDiscount = 40; // Replace with dynamic calculation or state if needed
//   const platformFee = 3; // Replace with dynamic calculation or state if needed
//   const deliveryCharges = totalSellingPrice > 500 ? 0 : 40; // Example logic for free delivery on orders above ₹500

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         {cartItems.length > 0 ? (
//           <>
//             <CartItemList cartItems={cartItems} onRemove={handleRemoveFromCart} />
//             <PriceDetails
//   items={cartItems.length}
//   totalPrice={totalPrice} // Total original price of items
//   discount={totalDiscount} // Total discount applied
//   deliveryCharges={deliveryCharges} // Conditional free delivery
//   totalAmount={totalSellingPrice + deliveryCharges} // Final amount after discounts and delivery charges
//   savings={totalDiscount} // Total savings
// />
// <TouchableOpacity
//             style={styles.placeOrderButton}
//             onPress={() => router.push('../(userTabs)/orders')} // Navigate to orders
//           >
//             <Text style={styles.placeOrderText}>Place Order</Text>
//           </TouchableOpacity>
//           </>
//         ) : (
//           <View style={styles.emptyCartContainer}>
//             <Image
//               source={require('../../assets/images/your_cart_empty.webp')}
//               style={styles.emptyCartImage}
//             />
//             <Text style={styles.emptyCartText}>Add ITEMS Now</Text>
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
//   errorText: { textAlign: 'center', marginTop: '50%', fontSize: 16, color: '#ff0000' },
//   priceDetailsCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   emptyCartContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '80vh',
//   },
//   emptyCartImage: {
//     width: 250,
//     height: 250,
//     marginBottom: 24,
//   },
//   emptyCartText: {
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
//   placeOrderButton: {
//   backgroundColor: '#f4511e',
//   paddingVertical: 15,
//   borderRadius: 8,
//   alignItems: 'center',
//   marginVertical: 20,
// },
// placeOrderText: {
//   color: '#fff',
//   fontSize: 16,
//   fontWeight: 'bold',
//   textAlign: 'center',
// },

// });
import React, { useState, useContext, useEffect, useMemo } from 'react';
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
import { router } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import { AuthContext } from '../../context/AuthContext';
import CartItemList from './CartItemList';
import PriceDetails from './PriceDetails';

export default function CartScreen() {
  const { token } = useContext(AuthContext);

  // Fetch data with custom hook
  const { data, loading, error } = useFetchCustomHook(Api.getCartAddedProduct, token);

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // Sync local cartItems state with fetched data
  useEffect(() => {
    if (data?.cart?.items) {
      setCartItems(data.cart.items);
    }
  }, [data]);

  // Handle removal of item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(Api.removeProductFromCart, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Product removed from cart successfully.');
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      } else {
        Alert.alert('Error', response.data.message || 'Failed to remove product from cart.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
          : item
      )
    );
  };
  

  // Calculate price details
  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0),
    [cartItems]
  );
  
  const totalSellingPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0),
    [cartItems]
  );
  
  const totalDiscount = useMemo(
    () => totalPrice - totalSellingPrice,
    [totalPrice, totalSellingPrice]
  );
  
  const deliveryCharges = totalSellingPrice > 500 ? 0 : 40; // Example logic for free delivery on orders above ₹500
  const totalAmount = useMemo(
    () => totalSellingPrice + deliveryCharges,
    [totalSellingPrice, deliveryCharges]
  );
  

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <>
            <CartItemList
              cartItems={cartItems}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
            />
           <PriceDetails
  items={cartItems.length}
  totalPrice={totalPrice}
  discount={totalDiscount}
  deliveryCharges={deliveryCharges}
  totalAmount={totalAmount}
  savings={totalDiscount}
/>

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={() => router.push('../(userTabs)/orders')} // Navigate to orders
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Image
              source={require('../../assets/images/your_cart_empty.webp')}
              style={styles.emptyCartImage}
            />
            <Text style={styles.emptyCartText}>Add ITEMS Now</Text>
            <TouchableOpacity
              style={styles.shopNowButton}
              onPress={() => router.push('./')}
            >
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  loader: { marginTop: '50%' },
  errorText: { textAlign: 'center', marginTop: '50%', fontSize: 16, color: '#ff0000' },
  emptyCartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  },
  emptyCartImage: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  emptyCartText: {
    fontSize: 24,
    color: '#120d0b',
    textAlign: 'center',
    fontWeight: '500',
  },
  shopNowButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f4511e',
    borderRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
