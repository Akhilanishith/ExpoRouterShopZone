// import React, { useEffect, useState } from "react";
// import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
// import ProductCard from "../../components/ProductCard";

// const ProductsComponent = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <View style={styles.container}>
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     display: "flex",
//     flexWrap: "wrap",
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 15,
//   },
// });

// export default ProductsComponent;



// import React, { useContext } from "react";
// import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
// import ProductCard from "../../components/ProductCard";
// import { AuthContext } from "../../context/AuthContext";
// import useFetchCustomHook from "../../hooks/useFetchCustomHook";
// import Api from "../../service/Api";

// const ProductsComponent = () => {
//   const { token } = useContext(AuthContext);
//   const { data, loading, error } = useFetchCustomHook(`${Api.getAllSellersAllBrandProducts}`,token );

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//     Alert.alert('Error', error);
//   }


//   const products = Array.isArray(data) ? data : data?.products || [];
// console.log(products)
//   if (products.length === 0) {
//     return <Text style={styles.emptyText}>No products found.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     display: "flex",
//     flexWrap: "wrap",
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 15,
//   },
//   emptyText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "gray",
//   },
// });

// export default ProductsComponent;


import React, { useContext } from "react";
import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import ProductCard from "../../components/ProductCard";
import { AuthContext } from "../../context/AuthContext";
import useFetchCustomHook from "../../hooks/useFetchCustomHook";
import Api from "../../service/Api";

const ProductsComponent = () => {
  const { token } = useContext(AuthContext);
  const { data, loading, error } = useFetchCustomHook(`${Api.getAllSellersAllBrandProducts}`, null);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Error", error.message || "An error occurred while fetching products.");
    return null;
  }

  const products = Array.isArray(data) ? data : data?.products || [];
  console.log("Products:", products);

  if (products.length === 0) {
    return <Text style={styles.emptyText}>No products found.</Text>;
  }

  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <ProductCard 
          key={product.id || index} // Use `product.id` or fallback to `index` if `id` is missing
          product={product} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});

export default ProductsComponent;
