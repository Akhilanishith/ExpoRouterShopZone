// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import Api from '../../service/Api';
// import { AuthContext } from '../../context/AuthContext';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AntDesign } from '@expo/vector-icons';



// const ItemDetails = () => {
//   const { itemId } = useLocalSearchParams(); // Get the product ID from the route parameters
//   const { token } = useContext(AuthContext);
//   const [imageIndex, setImageIndex] = useState(0)
//   const { data, loading, error } = useFetchCustomHook( `${Api.getProductById}/${itemId}`,  token );
 
  
   

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

//   const colors = [
//     { id: 1, image: '/placeholder.svg?height=60&width=60', color: 'navy' },
//     { id: 2, image: '/placeholder.svg?height=60&width=60', color: 'orange' },
//     { id: 3, image: '/placeholder.svg?height=60&width=60', color: 'red' },
//     { id: 4, image: '/placeholder.svg?height=60&width=60', color: 'black' },
//     { id: 5, image: '/placeholder.svg?height=60&width=60', color: 'green' },
//   ]





//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   // Error state
//   if (error) {
//     return <Text style={styles.emptyText}>error</Text>
//   }
//   if (!data.success) {
//     return <Text style={styles.emptyText}>error</Text>
//   }



//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewStyle}>
//       <View style={styles.container}>

//         <View style={styles.imageContainer}>
//           <Image source={{ uri: Api.main + data.product.images[imageIndex] }} style={styles.image} />
//           <View style={styles.allImageContainer}>
//             {
//               data.product.images.map((img, i) => <TouchableOpacity key={i} onPress={() => setImageIndex(i)} ><Image source={{ uri: Api.main + img }} style={[styles.allImage,{borderColor: i=== imageIndex ? "red" :"black"}]} /></TouchableOpacity>
//               )
//             }

//           </View>
//           <View style={styles.buttonContainer}>
//   <TouchableOpacity style={[styles.button, styles.addToCartButton]}>
//     <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
//     <Text style={styles.buttonText}>GO TO CART</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
//     <Text style={styles.buttonText}>BUY NOW</Text>
//   </TouchableOpacity>
// </View>
//         </View>
//         <View style={styles.contentContainer}>
//           <Text style={styles.title}>TRIGGR Ultrabuds N1 Neo </Text>
//           <Text style={styles.description}>TRIGGR Ultrabuds N1 Neo with ENC, 40Hr Playback, 13mm Drivers, Rich Bass, Fast Charging Bluetooth  (Sky Black, True Wireless)</Text>
//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>₹{data.product.originalPrice.toFixed(2)}</Text>
//           </View>
//           <View style={styles.ratingContainer}>
//             <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
//           </View>
//           <View style={{ display: "flex", flexDirection: "row", justifyContent:"center",  gap: 4, marginBottom:4}}>
//             {colors.map((c, i) => <TouchableOpacity key={i} style={{ padding: 15, backgroundColor: c.color, borderRadius: 50 }}></TouchableOpacity>
//             )}
//           </View>
//           <View style={{ display: "flex", flexDirection: "row", justifyContent:"center", gap: 4, marginBottom:4 }}>
//             {sizes.map((s, i) => <TouchableOpacity key={i} style={{ borderRadius: 50 }}><Text style={{

//               padding: 5,
//               width: 45,
//               textAlign: "center",
//               borderWidth: 1,
//               borderColor: "#dcdcdc",
//               color: "#000000",
//               borderRadius: 5,
//               fontSize: 16,
//             }}>{s}</Text></TouchableOpacity>
//             )}
//           </View>
//           <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
//           <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
//           <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
//           <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>

//         </View>
   

//       </View>
      
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     padding: 5,
//     backgroundColor: 'white',

//   },
//   container: {
//     display: 'flex',
//     ...Platform.OS === "web" && {
//       flexDirection: "row",
//       flexWrap: 'wrap',
//       alignItems: "center",
//       justifyContent: 'center',
//     }


//   },
//   imageContainer: {

//   },

//   image: {
//     width: 400,
//     height: 400,
//     resizeMode: 'cover',
//     marginBottom: 16,
//   },
//   allImageContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',

//   },
//   allImage: {
//     width: 80,
//     height: 80,
//     resizeMode: 'cover',
//     marginHorizontal: 2,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
   
//   },
//   contentContainer: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 400,
//     ...Platform.OS === "web" && {
//       maxWidth:700,
//       padding: 16,
      
//     }

//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 16,
//   },
//   priceContainer: {
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   ratingContainer: {
//     marginTop: 8,
//   },
//   rating: {
//     fontSize: 16,
//     color: '#ff5900',
//   },
//   loader: {
//     marginTop: '50%',
//   },
//   errorContainer: {
//     marginTop: '50%',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     marginTop: '50%',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: 'gray',
//   },

//   buttonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginTop: 16,
//   alignSelf: 'center', // Center the button group
//   width: '100%', // Adjust as per your desired width
//   maxWidth: 400, // Ensure it doesn’t stretch too wide
//   backgroundColor: '#fff',
//   padding: 10,
//   borderTopWidth: 1,
//   borderTopColor: '#ddd',
//   borderRadius: 8, // Optional for better styling
// },
// button: {
//   flex: 1,
//   paddingVertical: 15,
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexDirection: 'row',
//   marginHorizontal: 5, // Add spacing between buttons
//   borderRadius: 5,
// },
// buttonIcon: {
//   marginRight: 8,
// },
// addToCartButton: {
//   backgroundColor: '#798645',
// },
// buyNowButton: {
//   backgroundColor: '#EF233C',
// },
// buttonText: {
//   color: '#fff',
//   fontSize: 16,
//   fontWeight: '500',
// },

// });

// export default ItemDetails;

// import React, {  useState, useContext } from 'react';
// import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import Api from '../../service/Api';
// import { AuthContext } from '../../context/AuthContext';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AntDesign } from '@expo/vector-icons';

// const ItemDetails = () => {
//   const { itemId } = useLocalSearchParams(); // Get the product ID from the route parameters
//   const { token } = useContext(AuthContext);
//   const [imageIndex, setImageIndex] = useState(0);
//   const { data, loading, error } = useFetchCustomHook(`${Api.getProductById}/${itemId}`, token);
//   const router = useRouter();
//   const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

//   const colors = [
//     { id: 1, image: '/placeholder.svg?height=60&width=60', color: 'navy' },
//     { id: 2, image: '/placeholder.svg?height=60&width=60', color: 'orange' },
//     { id: 3, image: '/placeholder.svg?height=60&width=60', color: 'red' },
//     { id: 4, image: '/placeholder.svg?height=60&width=60', color: 'black' },
//     { id: 5, image: '/placeholder.svg?height=60&width=60', color: 'green' },
//   ];

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error || !data?.success) {
//     return <Text style={styles.emptyText}>An error occurred while fetching product details.</Text>;
//   }

//   const product = data.product;

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewStyle}>
//       <View style={styles.container}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: Api.main + product.images[imageIndex] }}
//             style={styles.image}
//           />
//           <View style={styles.allImageContainer}>
//             {product.images.map((img, i) => (
//               <TouchableOpacity
//                 key={i}
//                 onPress={() => setImageIndex(i)}
//               >
//                 <Image
//                   source={{ uri: Api.main + img }}
//                   style={[
//                     styles.allImage,
//                     { borderColor: i === imageIndex ? 'red' : 'black' },
//                   ]}
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View style={styles.buttonContainer}>
//           <TouchableOpacity
//   style={[styles.button, styles.addToCartButton]}
//   onPress={() => router.push('/CartScreen')}
// >
//   <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
//   <Text style={styles.buttonText}>GO TO CART</Text>
// </TouchableOpacity>

//             <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
//               <Text style={styles.buttonText}>BUY NOW</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.contentContainer}>
//           <Text style={styles.title}>{product.title}</Text>
//           <Text style={styles.description}>{product.description}</Text>
//           <Text style={styles.info}>{product.itemInfo}</Text>
//           <View style={styles.priceContainer}>
//   <Text style={styles.sellingPrice}>₹{product.sellingPrice.toFixed(2)}</Text>
//   <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
// </View>

//           <View style={styles.ratingContainer}>
//             <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               gap: 4,
//               marginBottom: 4,
//             }}
//           >
//             {colors.map((c, i) => (
//               <TouchableOpacity
//                 key={i}
//                 style={{ padding: 15, backgroundColor: c.color, borderRadius: 50 }}
//               ></TouchableOpacity>
//             ))}
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               gap: 4,
//               marginBottom: 4,
//             }}
//           >
//             {sizes.map((s, i) => (
//               <TouchableOpacity key={i} style={{ borderRadius: 50 }}>
//                 <Text
//                   style={{
//                     padding: 5,
//                     width: 45,
//                     textAlign: 'center',
//                     borderWidth: 1,
//                     borderColor: '#dcdcdc',
//                     color: '#000000',
//                     borderRadius: 5,
//                     fontSize: 16,
//                   }}
//                 >
//                   {s}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <Text style={styles.description}>
//             Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. T&C apply.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     padding: 5,
//     backgroundColor: 'white',
//   },
//   container: {
//     display: 'flex',
//     ...Platform.OS === 'web' && {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   },
//   imageContainer: {},
//   image: {
//     width: 400,
//     height: 400,
//     resizeMode: 'cover',
//     marginBottom: 16,
//   },
//   allImageContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   allImage: {
//     width: 80,
//     height: 80,
//     resizeMode: 'cover',
//     marginHorizontal: 2,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   contentContainer: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 400,
//     ...Platform.OS === 'web' && {
//       maxWidth: 700,
//       padding: 16,
//     },
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 16,
//   },
//   info: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 16,
//   },
//   priceContainer: {
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

//   ratingContainer: {
//     marginTop: 8,
//   },
//   rating: {
//     fontSize: 16,
//     color: '#ff5900',
//   },
//   loader: {
//     marginTop: '50%',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//     alignSelf: 'center',
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     borderRadius: 8,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   addToCartButton: {
//     backgroundColor: '#798645',
//   },
//   buyNowButton: {
//     backgroundColor: '#EF233C',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default ItemDetails;

// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import axios from 'axios';
// import Api from '../../service/Api';
// import { AuthContext } from '../../context/AuthContext';
// import useFetchCustomHook from '../../hooks/useFetchCustomHook';
// import { AntDesign } from '@expo/vector-icons';

// const ItemDetails = () => {
//   const { itemId } = useLocalSearchParams(); // Get the product ID from the route parameters
//   const { token } = useContext(AuthContext);
//   const [isInCart, setIsInCart] = useState(false); // State to track if the product is in the cart
//   const [imageIndex, setImageIndex] = useState(0);
//   const { data, loading, error } = useFetchCustomHook(`${Api.getProductById}/${itemId}`, token);
//   const router = useRouter();

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
//   const colors = [
//     { id: 1, image: '/placeholder.svg?height=60&width=60', color: 'navy' },
//     { id: 2, image: '/placeholder.svg?height=60&width=60', color: 'orange' },
//     { id: 3, image: '/placeholder.svg?height=60&width=60', color: 'red' },
//     { id: 4, image: '/placeholder.svg?height=60&width=60', color: 'black' },
//     { id: 5, image: '/placeholder.svg?height=60&width=60', color: 'green' },
//   ];

//   // const handleAddToCart = async () => {
//   //   try {
//   //     const response = await axios.post(
//   //       Api.addProductToCart,
//   //       { productId: itemId, quantity: 1 },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     if (response.data.success) {
//   //       setIsInCart(true); // Update the state to indicate the product is in the cart
//   //       Alert.alert('Success', 'Item added to cart successfully.');
//   //     } else {
//   //       Alert.alert('Error', response.data.message || 'Failed to add item to cart.');
//   //     }
//   //   } catch (err) {
//   //     Alert.alert('Error', 'Something went wrong. Please try again.');
//   //   }
//   // };
//   const handleAddToCart = async () => {
//     if (!token) {
//       // Redirect to AuthScreen with parameters for redirection after login
//       router.push({
//         pathname: '../AuthScreen/AuthScreen',
//         params: { returnTo: `../itemDetail/${itemId}` },
//       });
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         Api.addProductToCart,
//         { productId: itemId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.success) {
//         setIsInCart(true);
//         Alert.alert('Success', 'Item added to cart successfully.');
//         navigateToCart(); // Navigate to CartScreen after adding to cart
//       } else {
//         Alert.alert('Error', response.data.message || 'Failed to add item to cart.');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };
  
//   const navigateToCart = () => {
//     router.push('../(userTabs)/cart');
//   };
  

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error || !data?.success) {
//     return <Text style={styles.emptyText}>An error occurred while fetching product details.</Text>;
//   }

//   const product = data.product;

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewStyle}>
//       <View style={styles.container}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: Api.main + product.images[imageIndex] }}
//             style={styles.image}
//           />
//           <View style={styles.allImageContainer}>
//             {product.images.map((img, i) => (
//               <TouchableOpacity key={i} onPress={() => setImageIndex(i)}>
//                 <Image
//                   source={{ uri: Api.main + img }}
//                   style={[
//                     styles.allImage,
//                     { borderColor: i === imageIndex ? 'red' : 'black' },
//                   ]}
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View style={styles.buttonContainer}>
//             {isInCart ? (
//               <TouchableOpacity
//                 style={[styles.button, styles.addToCartButton]}
//                 onPress={navigateToCart}
//               >
//                 <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
//                 <Text style={styles.buttonText}>GO TO CART</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={[styles.button, styles.addToCartButton]}
//                 onPress={handleAddToCart}
//               >
//                 <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
//                 <Text style={styles.buttonText}>ADD TO CART</Text>
//               </TouchableOpacity>
//             )}

//             <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
//               <Text style={styles.buttonText}>BUY NOW</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.contentContainer}>
//           <Text style={styles.title}>{product.title}</Text>
//           <Text style={styles.description}>{product.description}</Text>
//           <Text style={styles.info}>{product.itemInfo}</Text>
//           <View style={styles.priceContainer}>
//             <Text style={styles.sellingPrice}>₹{product.sellingPrice.toFixed(2)}</Text>
//             <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
//           </View>

//           <View style={styles.ratingContainer}>
//             <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
//             {colors.map((c, i) => (
//               <TouchableOpacity key={i} style={{ padding: 15, backgroundColor: c.color, borderRadius: 50 }} />
//             ))}
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
//             {sizes.map((s, i) => (
//               <TouchableOpacity key={i} style={{ borderRadius: 50 }}>
//                 <Text
//                   style={{
//                     padding: 5,
//                     width: 45,
//                     textAlign: 'center',
//                     borderWidth: 1,
//                     borderColor: '#dcdcdc',
//                     color: '#000000',
//                     borderRadius: 5,
//                     fontSize: 16,
//                   }}
//                 >
//                   {s}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <Text style={styles.description}>
//             Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. T&C apply.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };


// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     padding: 5,
//     backgroundColor: 'white',
//   },
//   container: {
//     display: 'flex',
//     ...Platform.OS === 'web' && {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   },
//   imageContainer: {},
//   image: {
//     width: 400,
//     height: 400,
//     resizeMode: 'cover',
//     marginBottom: 16,
//   },
//   allImageContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   allImage: {
//     width: 80,
//     height: 80,
//     resizeMode: 'cover',
//     marginHorizontal: 2,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   contentContainer: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 400,
//     ...Platform.OS === 'web' && {
//       maxWidth: 700,
//       padding: 16,
//     },
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 16,
//   },
//   info: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 16,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     gap: 8, // Space between prices
//   },
//   sellingPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4CAF50', // Green for the discounted price
//   },
//   originalPrice: {
//     fontSize: 16,
//     color: '#888', // Grey color for the original price
//     textDecorationLine: 'line-through', // Strike-through style
//   },

//   ratingContainer: {
//     marginTop: 8,
//   },
//   rating: {
//     fontSize: 16,
//     color: '#ff5900',
//   },
//   loader: {
//     marginTop: '50%',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//     alignSelf: 'center',
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     borderRadius: 8,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   addToCartButton: {
//     backgroundColor: '#798645',
//   },
//   buyNowButton: {
//     backgroundColor: '#EF233C',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default ItemDetails;



import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';
import { AuthContext } from '../../context/AuthContext';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import { AntDesign } from '@expo/vector-icons';
import useSetTitle from '../../hooks/useSetTitle';

const ItemDetails = () => {
  useSetTitle('ItemDetails');
  const { itemId } = useLocalSearchParams(); // Get the product ID from the route parameters
  const { token } = useContext(AuthContext);
  const [isInCart, setIsInCart] = useState(false); // State to track if the product is in the cart
  const [imageIndex, setImageIndex] = useState(0);
  const { data, loading, error } = useFetchCustomHook(`${Api.getProductById}/${itemId}`, token);
  const router = useRouter();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const colors = [
    { id: 1, image: '/placeholder.svg?height=60&width=60', color: 'navy' },
    { id: 2, image: '/placeholder.svg?height=60&width=60', color: 'orange' },
    { id: 3, image: '/placeholder.svg?height=60&width=60', color: 'red' },
    { id: 4, image: '/placeholder.svg?height=60&width=60', color: 'black' },
    { id: 5, image: '/placeholder.svg?height=60&width=60', color: 'green' },
  ];

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await axios.post(
  //       Api.addProductToCart,
  //       { productId: itemId, quantity: 1 },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response.data.success) {
  //       setIsInCart(true); // Update the state to indicate the product is in the cart
  //       Alert.alert('Success', 'Item added to cart successfully.');
  //     } else {
  //       Alert.alert('Error', response.data.message || 'Failed to add item to cart.');
  //     }
  //   } catch (err) {
  //     Alert.alert('Error', 'Something went wrong. Please try again.');
  //   }
  // };
  const handleAddToCart = async () => {
    if (!token) {
      // Redirect to AuthScreen with parameters for redirection after login
      router.push({
        pathname: '../AuthScreen/AuthScreen',
        params: { returnTo: `../itemDetail/${itemId}` },
      });
      return;
    }
  
    try {
      const response = await axios.post(
        Api.addProductToCart,
        { productId: itemId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.data.success) {
        setIsInCart(true);
        Alert.alert('Success', 'Item added to cart successfully.');
        navigateToCart(); // Navigate to CartScreen after adding to cart
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add item to cart.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  const navigateToCart = () => {
    router.push('../(userTabs)/cart');
  };

  // const handleBuyNow = () => {
  //   if (!token) {
  //     // Redirect to AuthScreen with parameters for redirection after login
  //     router.push({
  //       pathname: '../AuthScreen/AuthScreen',
  //       params: { returnTo: `../itemDetail/${itemId}` },
  //     });
  //     return;
  //   }
  //   router.push({
  //     // pathname: '../PlaceOrderScreen/',
  //     pathname: '../PlaceOrderScreen/AddnewAddress',
  //     params: { productId: itemId },
  //   });
  // };



  const handleBuyNow = async () => {
    if (!token) {
      router.push({
        pathname: '../AuthScreen/AuthScreen',
        params: { returnTo: `../itemDetail/${itemId}` },
      });
      return;
    }

    try {
      const addressResponse = await axios.get(Api.getDeliveryAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (addressResponse.data.success) {
        // If address exists, go directly to OrderSummaryScreen
        router.push({
          pathname: '../PlaceOrderScreen/',
          params: { productId: itemId },
        });
      } else {
        // If no address, redirect to AddNewAddress screen
        router.push({
          pathname: '../PlaceOrderScreen/AddDeliveryAddress',
          params: { productId: itemId },
        });
      }
    } catch (err) {
      console.error('Error fetching address:', err);
      Alert.alert('Error', 'Could not fetch address. Please try again.');
    }
  };
  

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error || !data?.success) {
    return <Text style={styles.emptyText}>An error occurred while fetching product details.</Text>;
  }

  const product = data.product;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: Api.main + product.images[imageIndex] }}
            style={styles.image}
          />
          <View style={styles.allImageContainer}>
            {product.images.map((img, i) => (
              <TouchableOpacity key={i} onPress={() => setImageIndex(i)}>
                <Image
                  source={{ uri: Api.main + img }}
                  style={[
                    styles.allImage,
                    { borderColor: i === imageIndex ? 'red' : 'black' },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {isInCart ? (
              <TouchableOpacity
                style={[styles.button, styles.addToCartButton]}
                onPress={navigateToCart}
              >
                <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>GO TO CART</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.addToCartButton]}
                onPress={handleAddToCart}
              >
                <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>ADD TO CART</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.button, styles.buyNowButton]} onPress={handleBuyNow}>
  <Text style={styles.buttonText}>BUY NOW</Text>
</TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.info}>{product.itemInfo}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.sellingPrice}>₹{product.sellingPrice.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            {colors.map((c, i) => (
              <TouchableOpacity key={i} style={{ padding: 15, backgroundColor: c.color, borderRadius: 50 }} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            {sizes.map((s, i) => (
              <TouchableOpacity key={i} style={{ borderRadius: 50 }}>
                <Text
                  style={{
                    padding: 5,
                    width: 45,
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: '#dcdcdc',
                    color: '#000000',
                    borderRadius: 5,
                    fontSize: 16,
                  }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.description}>
            Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. T&C apply.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollViewStyle: {
    padding: 5,
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    ...Platform.OS === 'web' && {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  imageContainer: {},
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  allImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginHorizontal: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 400,
    ...Platform.OS === 'web' && {
      maxWidth: 700,
      padding: 16,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8, // Space between prices
  },
  sellingPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for the discounted price
  },
  originalPrice: {
    fontSize: 16,
    color: '#888', // Grey color for the original price
    textDecorationLine: 'line-through', // Strike-through style
  },

  ratingContainer: {
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#ff5900',
  },
  loader: {
    marginTop: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#798645',
  },
  buyNowButton: {
    backgroundColor: '#EF233C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ItemDetails;