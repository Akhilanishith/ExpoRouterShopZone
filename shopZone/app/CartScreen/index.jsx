
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
//     try {
//       const response = await axios.delete(Api.removeProductFromCart, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId },
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'Product removed from cart successfully.');
//         setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to remove product from cart.');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   // Handle quantity change
//   const handleQuantityChange = async (productId, newQuantity) => {
//     try {
//       // Make the API request to update quantity in the backend
//       const response = await axios.post(
//         Api.updateCartQuantity,
//         { productId, quantity: newQuantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.success) {
//         // Update the local state with the new quantity
//         setCartItems((prevItems) =>
//           prevItems.map((item) =>
//             item.product_id === productId
//               ? { ...item, quantity: newQuantity }
//               : item
//           )
//         );
//         console.log('Quantity updated successfully:', response.data);
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to update quantity.');
//       }
//     } catch (error) {
//       console.error('Error updating quantity:', error.response?.data || error.message);
//       Alert.alert('Error', 'Unable to update quantity. Please try again later.');
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

//   const deliveryCharges = totalSellingPrice > 500 ? 0 : 40; // Free delivery for orders above ₹500
//   const totalAmount = useMemo(
//     () => totalSellingPrice + deliveryCharges,
//     [totalSellingPrice, deliveryCharges]
//   );

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
//             <CartItemList
//               cartItems={cartItems}
//               onRemove={handleRemoveFromCart}
//               onQuantityChange={handleQuantityChange}
//             />

//             <PriceDetails
//               items={cartItems.length}
//               totalPrice={totalPrice}
//               discount={totalDiscount}
//               deliveryCharges={deliveryCharges}
//               totalAmount={totalAmount}
//               savings={totalDiscount}
//             />
//             <TouchableOpacity
//               style={styles.placeOrderButton}
//               onPress={() => router.push('../(userTabs)/orders')} // Navigate to orders
//             >
//               <Text style={styles.placeOrderText}>Place Order</Text>
//             </TouchableOpacity>
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
//     backgroundColor: '#f4511e',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
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
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const isWeb = width > 768; // Breakpoint for web layout

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

  // Handle removal of item from carttttttttt
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
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await axios.post(
        Api.updateCartQuantity,
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
        console.log('Quantity updated successfully:', response.data);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update quantity.');
      }
    } catch (error) {
      console.error('Error updating quantity:', error.response?.data || error.message);
      Alert.alert('Error', 'Unable to update quantity. Please try again later.');
    }
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

  const deliveryCharges = totalSellingPrice > 500 ? 0 : 40; // Free delivery for orders above ₹500
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
    <ScrollView
      style={[styles.container, isWeb && styles.webContainer]}
      contentContainerStyle={styles.scrollContent} // Ensures proper scrolling
    >
      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={styles.cartList}>
          <CartItemList
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleQuantityChange}
          />
        </View>

        <View style={[styles.priceDetails, isWeb && styles.webPriceDetails]}>
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flexDirection: 'column',
  },
  webContent: {
    flexDirection: 'row', // Side-by-side layout for web
    alignItems: 'flex-start',
  },
  cartList: {
    flex: 1,
    marginBottom: 16,
  },
  priceDetails: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 16,
  },
  webPriceDetails: {
    width: '30%',
    marginLeft: 16,
  },
  loader: {
    marginTop: '50%',
  },
  errorText: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 16,
    color: '#ff0000',
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
  },
});







