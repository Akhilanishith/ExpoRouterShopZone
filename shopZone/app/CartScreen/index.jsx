// import React, { useContext } from 'react';
// import { View, Text, ScrollView, Image, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { Stack } from 'expo-router';
// import useSetTitle from '../../hooks/useSetTitle';

// import axios from 'axios';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AuthContext } from '../../context/AuthContext';

// export default function CartScreen() {
//   useSetTitle("Your Bag");
//   const { token } = useContext(AuthContext);

//   // Fetch cart data
//   const { data, loading, error, refetch } = useFetchCustomHook(Api.getCartAddedProduct, token);

//   const handleAddToCart = async (productId, quantity) => {
//     try {
     
//       const response = await axios.post(
//         Api.addProductToCart,
//         { productId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       console.log('API Response:', response.data);
  
//       if (response.data.success) {
//         Alert.alert('Success', 'Item added to cart successfully.');
//         refetch(); // Refetch cart data
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to add item to cart.');
//       }
//     } catch (err) {
//       console.error('Error adding product to cart:', err);
  
//       // Check if the error response exists
//       if (err.response && err.response.data) {
//         console.error('Error Response:', err.response.data);
//         Alert.alert('Error', err.response.data.message || 'Something went wrong.');
//       } else {
//         Alert.alert('Error', 'Something went wrong. Please try again.');
//       }
//     }
//   };
  

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     Alert.alert('Error', error.message || 'Something went wrong');
//     return null;
//   }

//   const cartItems = data?.cart?.items || [];
//   const totalAmount = data?.cart?.total_price || 0;

//   return (
//     <>
//       <Stack.Screen 
//         options={{
//           title: 'Shopping Bag',
//           headerShadowVisible: false
//         }} 
//       />
      
//       <ScrollView style={styles.container}>
//         <View style={styles.content}>
//           {/* Progress Steps */}
//           <View style={styles.progressSteps}>
//             <Text style={styles.activeStep}>BAG</Text>
//             <Text style={styles.inactiveStep}>ADDRESS</Text>
//             <Text style={styles.inactiveStep}>PAYMENT</Text>
//           </View>

//           {/* Cart Items */}
//           {cartItems.length > 0 ? (
//             cartItems.map((item, index) => (
//               <View style={styles.card} key={index}>
//                 <View style={styles.cartHeader}>
//                   <Text style={styles.heading}>{`${index + 1}/${cartItems.length} ITEMS SELECTED`}</Text>
//                   <Pressable>
//                     <Text style={styles.linkText}>REMOVE</Text>
//                   </Pressable>
//                 </View>

//                 <View style={styles.cartItem}>
                
//                   <Image source={{ uri: Api.main + product.images[0] }} 
//                     style={styles.productImage}
//                   />
//                   <View style={styles.productInfo}>
//                     <Text style={styles.heading}>{item.product_id.name || 'Product Name'}</Text>
//                     <Text style={styles.productDescription}>{item.product_id.description || 'Product Description'}</Text>
//                     <Text style={styles.sellerText}>{`Sold by: ${item.product_id.seller || 'Unknown'}`}</Text>

//                     <View style={styles.controls}>
//                       <View style={styles.controlGroup}>
//                         <Text style={styles.label}>Size</Text>
//                         <Pressable style={styles.sizeButton}>
//                           <Text style={styles.sizeButtonText}>{item.size || 'S'}</Text>
//                         </Pressable>
//                       </View>
                      
//                       <View style={styles.controlGroup}>
//                         <Text style={styles.label}>Qty</Text>
//                         <View style={styles.quantityControl}>
//                           <Pressable
//                             style={styles.quantityButton}
//                             onPress={() => handleAddToCart(item.product_id._id, item.quantity - 1)}
//                           >
//                             <Text style={styles.quantityButtonText}>-</Text>
//                           </Pressable>
//                           <Text style={styles.quantityText}>{item.quantity || 1}</Text>
//                           <Pressable
//                             style={styles.quantityButton}
//                             onPress={() => handleAddToCart(item.product_id._id, item.quantity + 1)}
//                           >
//                             <Text style={styles.quantityButtonText}>+</Text>
//                           </Pressable>
//                         </View>
//                       </View>
//                     </View>

//                     <View style={styles.priceInfo}>
//                       <Text style={styles.currentPrice}>{`₹${item.price}`}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ))
//           ) : (
//             <View style={styles.card}>
//               <Text style={styles.heading}>Your cart is empty</Text>
//             </View>
//           )}

//           {/* Price Details */}
//           {cartItems.length > 0 && (
//             <View style={styles.card}>
//               <Text style={[styles.heading, styles.marginBottom]}>PRICE DETAILS</Text>
//               <View style={styles.priceDetails}>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.priceLabel}>Total Amount</Text>
//                   <Text style={[styles.priceValue, styles.heading]}>{`₹${totalAmount}`}</Text>
//                 </View>
//               </View>
              
//               <Pressable style={styles.primaryButton}>
//                 <Text style={styles.primaryButtonText}>PLACE ORDER</Text>
//               </Pressable>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   content: {
//     padding: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   progressSteps: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   activeStep: {
//     color: '#007AFF',
//     fontWeight: '500',
//     marginHorizontal: 16,
//   },
//   inactiveStep: {
//     color: '#666666',
//     marginHorizontal: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   heading: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   linkText: {
//     color: '#666666',
//     fontSize: 14,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     paddingTop: 16,
//   },
//   productImage: {
//     width: 120,
//     height: 150,
//     borderRadius: 8,
//   },
//   productInfo: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   productDescription: {
//     fontSize: 14,
//     marginTop: 4,
//   },
//   sellerText: {
//     color: '#666666',
//     fontSize: 14,
//     marginTop: 4,
//   },
//   controls: {
//     flexDirection: 'row',
//     marginTop: 16,
//   },
//   controlGroup: {
//     marginRight: 16,
//   },
//   label: {
//     fontSize: 12,
//     marginBottom: 4,
//     color: '#666',
//   },
//   sizeButton: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     padding: 8,
//     width: 40,
//     alignItems: 'center',
//   },
//   sizeButtonText: {
//     fontSize: 14,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 16,
//   },
//   quantityText: {
//     marginHorizontal: 12,
//     fontSize: 14,
//   },
//   priceInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   currentPrice: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });







// import React, { useContext } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import { Stack } from 'expo-router';
// import axios from 'axios';
// import useSetTitle from '../../hooks/useSetTitle';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AuthContext } from '../../context/AuthContext';

// export default function CartScreen() {
//   useSetTitle('Your Bag');
//   const { token } = useContext(AuthContext);

//   const { data, loading, error, refetch } = useFetchCustomHook(Api.getCartAddedProduct, token);

//   const handleAddToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post(
//         Api.addProductToCart,
//         { productId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         Alert.alert('Success', 'Product updated successfully.');
//         refetch();
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to update product in cart.');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
//   }

//   const cartItems = data?.cart?.items || [];
//   const totalAmount = data?.cart?.total_price || 0;

//   return (
//     <>
//       <Stack.Screen options={{ title: 'Shopping Bag', headerShadowVisible: false }} />
//       <ScrollView style={styles.container}>
//         <View style={styles.content}>
//           <View style={styles.progressSteps}>
//             <Text style={styles.activeStep}>BAG</Text>
//             <Text style={styles.inactiveStep}>ADDRESS</Text>
//             <Text style={styles.inactiveStep}>PAYMENT</Text>
//           </View>

//           {cartItems.length > 0 ? (
//             cartItems.map((item, index) => {
//               const product = item.product_id;
//               return (
//                 <View style={styles.card} key={index}>
//                   <Image
//                     source={{ uri: Api.main + (product.images?.[0] || '') }}
//                     style={styles.productImage}
//                   />
//                   <View style={styles.productInfo}>
//                     <Text style={styles.title}>{product.title}</Text>
//                     <View style={styles.priceContainer}>
//                       <Text style={styles.sellingPrice}>{`₹${product.sellingPrice.toFixed(2)}`}</Text>
//                       <Text style={styles.originalPrice}>{`₹${product.originalPrice.toFixed(2)}`}</Text>
//                     </View>
//                     <View style={styles.quantityControl}>
//                       <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => handleAddToCart(product._id, Math.max(1, item.quantity - 1))}
//                       >
//                         <Text style={styles.quantityButtonText}>-</Text>
//                       </TouchableOpacity>
//                       <Text style={styles.quantityText}>{item.quantity}</Text>
//                       <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => handleAddToCart(product._id, item.quantity + 1)}
//                       >
//                         <Text style={styles.quantityButtonText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               );
//             })
//           ) : (
//             <Text style={styles.emptyCartText}>Your cart is empty</Text>
//           )}

//           {cartItems.length > 0 && (
//             <View style={styles.card}>
//               <Text style={styles.heading}>PRICE DETAILS</Text>
//               <View style={styles.priceDetails}>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.priceLabel}>Total Amount</Text>
//                   <Text style={styles.priceValue}>{`₹${totalAmount.toFixed(2)}`}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.primaryButton}>
//                 <Text style={styles.primaryButtonText}>PLACE ORDER</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </>
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   content: {
//     padding: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   progressSteps: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   activeStep: {
//     color: '#007AFF',
//     fontWeight: '500',
//     marginHorizontal: 16,
//   },
//   inactiveStep: {
//     color: '#666666',
//     marginHorizontal: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   productInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   description: {
//     marginTop: 4,
//     fontSize: 14,
//     color: '#666',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   sellingPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 14,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   quantityButton: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 16,
//   },
//   quantityText: {
//     marginHorizontal: 12,
//     fontSize: 14,
//   },
//   priceDetails: {
//     marginVertical: 16,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   priceLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   priceValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   emptyCartText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 18,
//     color: '#666',
//   },
// });




// import React, { useContext } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { Stack } from 'expo-router';
// import axios from 'axios';
// import useSetTitle from '../../hooks/useSetTitle';
// import Api from '../../service/Api';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AuthContext } from '../../context/AuthContext';

// export default function CartScreen() {
//     useSetTitle('Your Bag');
//     const { token } = useContext(AuthContext);
  
//     const { data, loading, error, refetch } = useFetchCustomHook(Api.getCartAddedProduct, token);
  
//     const handleAddToCart = async (productId, quantity) => {
//       try {
//         const response = await axios.post(
//           Api.addProductToCart,
//           { productId, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
  
//         if (response.data.success) {
//           Alert.alert('Success', 'Product updated successfully.');
//           refetch();
//         } else {
//           Alert.alert('Error', response.data.message || 'Failed to update product in cart.');
//         }
//       } catch (err) {
//         Alert.alert('Error', 'Something went wrong. Please try again.');
//       }
//     };
  
//     if (loading) {
//       return <ActivityIndicator style={styles.loader} />;
//     }
  
//     if (error) {
//       return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
//     }
  
//     const cartItems = data?.cart?.items || [];
  
//     // Calculate the total original price (before discount)
//     const totalOriginalPrice = cartItems.reduce(
//       (sum, item) => sum + item.originalPrice * item.quantity,
//       0
//     );
  
//     // Calculate the total price (after discount)
//     const totalPrice = cartItems.reduce(
//       (sum, item) => sum + item.sellingPrice * item.quantity,
//       0
//     );
  
//     // Calculate the total discount
//     const totalDiscount = totalOriginalPrice - totalPrice;
  
//     const platformFee = 3; // Example fee
//     const deliveryCharges = 0;
  
//     const totalAmount = totalPrice + platformFee + deliveryCharges;
  
//     return (
//       <>
//         <Stack.Screen options={{ title: 'Shopping Bag', headerShadowVisible: false }} />
//         <ScrollView style={styles.container}>
//           <View style={styles.content}>
//             <View style={styles.progressSteps}>
//               <Text style={styles.activeStep}>BAG</Text>
//               <Text style={styles.inactiveStep}>ADDRESS</Text>
//               <Text style={styles.inactiveStep}>PAYMENT</Text>
//             </View>
  
//             {cartItems.length > 0 ? (
//               cartItems.map((item, index) => (
//                 <View style={styles.card} key={index}>
//                   <Image
//                     source={{ uri: Api.main + (item.images?.[0] || '') }}
//                     style={styles.productImage}
//                   />
//                   <View style={styles.productInfo}>
//                     <Text style={styles.title}>{item.title}</Text>
//                     <View style={styles.priceContainer}>
//                       <Text style={styles.sellingPrice}>{`₹${item.sellingPrice.toFixed(2)}`}</Text>
//                       <Text style={styles.originalPrice}>{`₹${item.originalPrice.toFixed(2)}`}</Text>
//                     </View>
//                     <Text style={styles.discount}>{`You saved ₹${(
//                       (item.originalPrice - item.sellingPrice) * item.quantity
//                     ).toFixed(2)}`}</Text>
//                     <Text style={styles.itemTotal}>{`Total: ₹${(
//                       item.sellingPrice * item.quantity
//                     ).toFixed(2)}`}</Text>
//                   </View>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.emptyCartText}>Your cart is empty</Text>
//             )}
  
//             {cartItems.length > 0 && (
//               <View style={styles.priceDetailsCard}>
//                 <Text style={styles.heading}>PRICE DETAILS</Text>
//                 <View style={styles.priceDetails}>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.priceLabel}>Price ({cartItems.length} items)</Text>
//                     <Text style={styles.priceValue}>{`₹${totalOriginalPrice.toFixed(2)}`}</Text>
//                   </View>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.priceLabel}>Discount</Text>
//                     <Text style={[styles.priceValue, styles.discount]}>{`-₹${totalDiscount.toFixed(
//                       2
//                     )}`}</Text>
//                   </View>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.priceLabel}>Platform Fee</Text>
//                     <Text style={styles.priceValue}>{`₹${platformFee.toFixed(2)}`}</Text>
//                   </View>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.priceLabel}>Delivery Charges</Text>
//                     <Text style={[styles.priceValue, styles.free]}>{deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges.toFixed(2)}`}</Text>
//                   </View>
//                   <View style={styles.separator} />
//                   <View style={styles.priceRow}>
//                     <Text style={[styles.priceLabel, styles.bold]}>Total Amount</Text>
//                     <Text style={[styles.priceValue, styles.bold]}>{`₹${totalAmount.toFixed(2)}`}</Text>
//                   </View>
//                 </View>
//                 <Text style={styles.savings}>{`You will save ₹${totalDiscount.toFixed(2)} on this order`}</Text>
//                 <TouchableOpacity style={styles.primaryButton}>
//                   <Text style={styles.primaryButtonText}>PLACE ORDER</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       </>
//     );
//   }
  
  
  
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   content: {
//     padding: 16,
//   },
//   progressSteps: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   activeStep: {
//     color: '#007AFF',
//     fontWeight: '500',
//     marginHorizontal: 16,
//   },
//   inactiveStep: {
//     color: '#666666',
//     marginHorizontal: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   productInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   sellingPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 14,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
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
//   priceDetails: {
//     marginVertical: 8,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   priceLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   priceValue: {
//     fontSize: 14,
//     color: '#333',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     marginVertical: 8,
//   },
//   savings: {
//     fontSize: 14,
//     color: '#4CAF50',
//     marginTop: 8,
//   },
//   primaryButton: {
//     backgroundColor: '#f4511e',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });


import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import useSetTitle from '../../hooks/useSetTitle';
import Api from '../../service/Api';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import { AuthContext } from '../../context/AuthContext';
import CartItemList from './CartItemList';


export default function CartScreen() {
  useSetTitle('Your Bag');
  const { token } = useContext(AuthContext);

  const { data, loading, error, refetch } = useFetchCustomHook(Api.getCartAddedProduct, token);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        Api.addProductToCart,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Product updated successfully.');
        refetch();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update product in cart.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Failed to load cart. Please try again later.</Text>;
  }

  const cartItems = data?.cart?.items || [];

  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );
  const totalDiscount = totalOriginalPrice - totalPrice;
  const platformFee = 3;
  const deliveryCharges = 0;
  const totalAmount = totalPrice + platformFee + deliveryCharges;

  return (
    <>
      <Stack.Screen options={{ title: 'Shopping Bag', headerShadowVisible: false }} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.progressSteps}>
            <Text style={styles.activeStep}>BAG</Text>
            <Text style={styles.inactiveStep}>ADDRESS</Text>
            <Text style={styles.inactiveStep}>PAYMENT</Text>
          </View>

          {cartItems.length > 0 ? (
            <CartItemList cartItems={cartItems} />
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          )}

          {cartItems.length > 0 && (
            <View style={styles.priceDetailsCard}>
              <Text style={styles.heading}>PRICE DETAILS</Text>
              <View style={styles.priceDetails}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Price ({cartItems.length} items)</Text>
                  <Text style={styles.priceValue}>{`₹${totalOriginalPrice.toFixed(2)}`}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Discount</Text>
                  <Text style={[styles.priceValue, styles.discount]}>{`-₹${totalDiscount.toFixed(2)}`}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Platform Fee</Text>
                  <Text style={styles.priceValue}>{`₹${platformFee.toFixed(2)}`}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Delivery Charges</Text>
                  <Text style={[styles.priceValue, styles.free]}>{deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges.toFixed(2)}`}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.priceRow}>
                  <Text style={[styles.priceLabel, styles.bold]}>Total Amount</Text>
                  <Text style={[styles.priceValue, styles.bold]}>{`₹${totalAmount.toFixed(2)}`}</Text>
                </View>
              </View>
              <Text style={styles.savings}>{`You will save ₹${totalDiscount.toFixed(2)} on this order`}</Text>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>PLACE ORDER</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  loader: {
    marginTop: '50%',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  activeStep: {
    color: '#007AFF',
    fontWeight: '500',
    marginHorizontal: 16,
  },
  inactiveStep: {
    color: '#666666',
    marginHorizontal: 16,
  },
  priceDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  priceDetails: {
    marginVertical: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  savings: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginVertical: 20,
  },
  discount: {
    color: '#FF5722',
  },
  free: {
    color: '#4CAF50',
  },
});
