// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import useFetchCustomHook from "../../hooks/useFetchCustomHook";
// import Api from "../../service/Api";

// import QuantitySelector from "../CartScreen/QuantitySelector";
// import PriceDetails from "../CartScreen/PriceDetails";

// const OrderSummaryScreen = () => {
//   const { token } = useContext(AuthContext);
//   const { productId, selectedAddress } = useLocalSearchParams(); // Get productId from params
//   const router = useRouter();

//   const [product, setProduct] = useState(null);
//   const [deliveryAddress, setDeliveryAddress] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   // Fetch User Details using the custom hook
//   const {
//     data: userData,
//     loading: userLoading,
//     error: userError,
//   } = useFetchCustomHook(Api.getUserDetails, token);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productId) {
//         setError(true);
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`${Api.getProductById}/${productId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           setProduct(response.data.product);
//         } else {
//           setError(true);
//         }
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Set delivery address from params or fetch the default one
//     if (selectedAddress) {
//       setDeliveryAddress(JSON.parse(selectedAddress));
//     } else {
//       const fetchDefaultAddress = async () => {
//         try {
//           const response = await axios.get(Api.getDeliveryAddress, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           if (response.data.success && response.data.addresses.length > 0) {
//             setDeliveryAddress(response.data.addresses[0]); // Set the first address as default
//           } else {
//             setDeliveryAddress(null);
//           }
//         } catch (err) {
//           setDeliveryAddress(null);
//         }
//       };
//       fetchDefaultAddress();
//     }

//     fetchProductDetails();
//   }, [productId, selectedAddress, token]);

//   const handleIncrease = () => {
//     setQuantity((prev) => {
//       const newQuantity = prev + 1;
//       updateCartQuantity(newQuantity);
//       return newQuantity;
//     });
//   };
  
//   const handleDecrease = () => {
//     setQuantity((prev) => {
//       if (prev > 1) {
//         const newQuantity = prev - 1;
//         updateCartQuantity(newQuantity);
//         return newQuantity;
//       }
//       return prev;
//     });
//   };

//   const updateCartQuantity = async (newQuantity) => {
//     try {
//       const response = await axios.post(
//         `${Api.updateCartQuantity}`,
//         {
//           productId: product._id,
//           quantity: newQuantity,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       if (!response.data.success) {
//         alert("Failed to update quantity");
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       alert("Error updating quantity.");
//     }
//   };

//   // Show loading indicator while fetching product or user details
//   if (loading || userLoading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   // Show error message if product or user details fail to load
//   if (error || !product || userError) {
//     return (
//       <Text style={styles.errorText}>
//         Failed to load product or user details.
//       </Text>
//     );
//   }

//   const deliveryCharges = 0;
//   const platformFee = 3;

//   return (
//     <ScrollView style={styles.container}>
//       {/* Login Section */}
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionNumber}>1</Text>
//           <Text style={styles.sectionTitle}>LOGIN</Text>
//         </View>
//         <Text style={styles.sectionContent}>
//           +91 {userData?.phone?.number || userData?.phone || "Fetching..."}
//         </Text>
//       </View>

//       {/* Delivery Address Section */}
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionNumber}>2</Text>
//           <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
//           <TouchableOpacity
//             style={styles.changeButton}
//             onPress={() =>
//               router.push({
//                 pathname: "../PlaceOrderScreen/AddNewDeliveryAddress",
//                 params: { productId: productId },
//               })
//             }
//           >
//             <Text style={styles.changeButtonText}>CHANGE</Text>
//           </TouchableOpacity>
//         </View>
//         {deliveryAddress ? (
//           <Text style={styles.sectionContent}>
//             {deliveryAddress.name}, {deliveryAddress.address},{" "}
//             {deliveryAddress.city}, {deliveryAddress.state},{" "}
//             {deliveryAddress.pincode}. Mobile: {deliveryAddress.mobile}
//           </Text>
//         ) : (
//           <Text style={styles.sectionContent}>
//             No address found. Please add a new address.
//           </Text>
//         )}
//       </View>

//       {/* Order Summary Section */}
//       <View style={styles.orderSummary}>
//         <Text style={styles.orderSummaryTitle}>ORDER SUMMARY</Text>
//         <View style={styles.productContainer}>
//           <Image
//             source={{ uri: Api.main + product.images[0] }}
//             style={styles.productImage}
//           />
//           <View style={styles.productDetails}>
//             <Text style={styles.productTitle}>{product.title}</Text>
//             <Text style={styles.productSize}>Size: L, Multicolor</Text>
//             <Text style={styles.sellerInfo}>
//               Seller: {product.seller || "Unknown Seller"}
//             </Text>
//             <QuantitySelector
//               quantity={quantity}
//               onIncrease={handleIncrease}
//               onDecrease={handleDecrease}
//             />
//             <View style={styles.priceRow}>
//               <Text style={styles.sellingPrice}>
//                 ₹{(product.sellingPrice * quantity).toFixed(2)}
//               </Text>
//               <Text style={styles.originalPrice}>
//                 ₹{(product.originalPrice * quantity).toFixed(2)}
//               </Text>
//               <Text style={styles.discount}>
//                 {Math.round(
//                   ((product.originalPrice - product.sellingPrice) /
//                     product.originalPrice) *
//                     100
//                 )}
//                 % Off
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Price Details Section */}
//       <PriceDetails
//         items={quantity}
//         totalPrice={product.originalPrice * quantity}
//         discount={
//           (product.originalPrice - product.sellingPrice) * quantity
//         }
//         deliveryCharges={deliveryCharges}
//         totalAmount={product.sellingPrice * quantity + platformFee}
//         savings={
//           (product.originalPrice - product.sellingPrice) * quantity
//         }
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f5f5f5" },
//   section: {
//     backgroundColor: "#fff",
//     marginBottom: 8,
//     padding: 16,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   sectionNumber: {
//     backgroundColor: "#1976D2",
//     color: "#fff",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     textAlign: "center",
//     lineHeight: 24,
//     marginRight: 8,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "bold", flex: 1 },
//   changeButtonText: { color: "#1976D2" },
//   sectionContent: { fontSize: 14, color: "#666", marginLeft: 32 },
//   orderSummary: { backgroundColor: "#fff", marginBottom: 8, padding: 16 },
//   orderSummaryTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
//   productContainer: { flexDirection: "row", paddingVertical: 8 },
//   productImage: {
//     width: 100,
//     height: 100,
//     resizeMode: "cover",
//     marginRight: 16,
//   },
//   productDetails: { flex: 1 },
//   productTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   productSize: { fontSize: 14, color: "#666", marginBottom: 4 },
//   sellerInfo: { fontSize: 14, color: "#666", marginBottom: 8 },
//   priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   sellingPrice: { fontSize: 18, fontWeight: "bold", marginRight: 8 },
//   originalPrice: {
//     fontSize: 14,
//     textDecorationLine: "line-through",
//     color: "#666",
//     marginRight: 8,
//   },
//   discount: { color: "#4CAF50", fontSize: 14 },
//   loader: { marginTop: "50%" },
//   errorText: { marginTop: "50%", textAlign: "center", color: "red" },
// });

// export default OrderSummaryScreen;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import useFetchCustomHook from "../../hooks/useFetchCustomHook";
import Api from "../../service/Api";

import QuantitySelector from "../CartScreen/QuantitySelector";
import PriceDetails from "../CartScreen/PriceDetails";

const OrderSummaryScreen = () => {
  const { token } = useContext(AuthContext);
  const { productId, selectedAddress } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [product, setProduct] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetchCustomHook(Api.getUserDetails, token);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${Api.getProductById}/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (selectedAddress) {
      setDeliveryAddress(JSON.parse(selectedAddress));
    } else {
      const fetchDefaultAddress = async () => {
        try {
          const response = await axios.get(Api.getDeliveryAddress, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success && response.data.addresses.length > 0) {
            setDeliveryAddress(response.data.addresses[0]);
          } else {
            setDeliveryAddress(null);
          }
        } catch (err) {
          setDeliveryAddress(null);
        }
      };
      fetchDefaultAddress();
    }

    fetchProductDetails();
  }, [productId, selectedAddress, token]);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      updateCartQuantity(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        updateCartQuantity(newQuantity);
        return newQuantity;
      }
      return prev;
    });
  };

  const updateCartQuantity = async (newQuantity) => {
    try {
      const response = await axios.post(
        `${Api.updateCartQuantity}`,
        {
          productId: product._id,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data.success) {
        alert("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Error updating quantity.");
    }
  };

  if (loading || userLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error || !product || userError) {
    return (
      <Text style={styles.errorText}>
        Failed to load product or user details.
      </Text>
    );
  }

  const deliveryCharges = 0;
  const platformFee = 19;

  return (
    <ScrollView style={styles.pageContainer}>
      <View
        style={
          width > 768
            ? styles.webContainer
            : styles.mobileContainer
        }
      >
        <View style={styles.leftPane}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionNumber}>1</Text>
              <Text style={styles.sectionTitle}>LOGIN</Text>
            </View>
            <Text style={styles.sectionContent}>
              +91 {userData?.phone?.number || userData?.phone || "Fetching..."}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionNumber}>2</Text>
              <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() =>
                  router.push({
                    pathname: "../PlaceOrderScreen/AddNewDeliveryAddress",
                    params: { productId: productId },
                  })
                }
              >
                <Text style={styles.changeButtonText}>CHANGE</Text>
              </TouchableOpacity>
            </View>
            {deliveryAddress ? (
              <Text style={styles.sectionContent}>
                {deliveryAddress.name}, {deliveryAddress.address}, {" "}
                {deliveryAddress.city}, {deliveryAddress.state}, {" "}
                {deliveryAddress.pincode}. Mobile: {deliveryAddress.mobile}
              </Text>
            ) : (
              <Text style={styles.sectionContent}>
                No address found. Please add a new address.
              </Text>
            )}
          </View>

          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryTitle}>ORDER SUMMARY</Text>
            <View style={styles.productContainer}>
              <Image
                source={{ uri: Api.main + product.images[0] }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.sellerInfo}>
                  Seller: {product.seller || "Unknown Seller"}
                </Text>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
                <View style={styles.priceRow}>
                  <Text style={styles.sellingPrice}>
                    ₹{(product.sellingPrice * quantity).toFixed(2)}
                  </Text>
                  <Text style={styles.originalPrice}>
                    ₹{(product.originalPrice * quantity).toFixed(2)}
                  </Text>
                  <Text style={styles.discount}>
                    {Math.round(
                      ((product.originalPrice - product.sellingPrice) /
                        product.originalPrice) *
                        100
                    )}
                    % Off
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {width > 768 ? (
          <View style={styles.rightPane}>
            <PriceDetails
              items={quantity}
              totalPrice={product.originalPrice * quantity}
              discount={
                (product.originalPrice - product.sellingPrice) * quantity
              }
              deliveryCharges={deliveryCharges}
              totalAmount={product.sellingPrice * quantity + platformFee}
              savings={
                (product.originalPrice - product.sellingPrice) * quantity
              }
            />
          </View>
        ) : (
          <PriceDetails
            items={quantity}
            totalPrice={product.originalPrice * quantity}
            discount={
              (product.originalPrice - product.sellingPrice) * quantity
            }
            deliveryCharges={deliveryCharges}
            totalAmount={product.sellingPrice * quantity + platformFee}
            savings={
              (product.originalPrice - product.sellingPrice) * quantity
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  webContainer: {
    flexDirection: "row",
  },
  mobileContainer: {
    flexDirection: "column",
  },
  leftPane: {
    flex: 2,
    padding: 16,
  },
  rightPane: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionNumber: {
    backgroundColor: "#1976D2",
    color: "#fff",
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    lineHeight: 28,
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", flex: 1 },
  changeButtonText: { color: "#1976D2", fontSize: 14, fontWeight: "bold" },
  sectionContent: { fontSize: 16, color: "#333", marginLeft: 36 },
  orderSummary: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  orderSummaryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  productContainer: { flexDirection: "row", paddingVertical: 12 },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  sellerInfo: { fontSize: 14, color: "#666", marginBottom: 8 },
   priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sellingPrice: { fontSize: 18, fontWeight: "bold", color: "#000" },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#999",
    marginLeft: 8,
  },
  discount: { color: "#4CAF50", fontSize: 14, marginLeft: 8 },
  loader: { marginTop: "50%" },
  errorText: { marginTop: "50%", textAlign: "center", color: "red" },
});

export default OrderSummaryScreen;

