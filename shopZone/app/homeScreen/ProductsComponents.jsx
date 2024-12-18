

import React, { useContext } from "react";
import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import ProductCard from "../../components/ProductCard";
import { AuthContext } from "../../context/AuthContext";
import useFetchCustomHook from "../../hooks/useFetchCustomHook";
import Api from "../../service/Api";
const ProductsComponents = ({ category, subcategory, subTypes }) => {
    const { token } = useContext(AuthContext);
  
    // Prepare the query parameters to send
    const queryParams = new URLSearchParams();
  
    if (category) queryParams.append('category', category);
    if (subcategory) queryParams.append('subcategory', subcategory);
    if (subTypes) queryParams.append('productType', subTypes);
  
    // Pass the query parameters to the API request
    const { data, loading, error } = useFetchCustomHook(`${Api.getAllSellersAllBrandTypesProducts}?${queryParams.toString()}`, null);
  
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
          <ProductCard key={product.id || index} product={product} />
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
  
  export default ProductsComponents;
  