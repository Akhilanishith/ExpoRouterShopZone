import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../../context/AuthContext';
import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
import Api from '../../../service/Api';

const SellerVerifiedBrands = () => {
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const router = useRouter(); // Use router for navigation

  // Fetch verified brands created by the seller
  const { data, loading, error } = useFetchCustomHook(`${Api.getSellerCreatedVerifiedBrands}`, token);

  // Loading state
  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  // Error state
  if (error) {
    alert(error);
    return null;
  }

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brandItem}
      onPress={() => router.push(`./${item._id}`)} // Pass brandId (_id) to SellerAddProduct screen
    >
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verified Brands</Text>
      {data && data.brands && data.brands.length > 0 ? (
        <FlatList
          data={data.brands}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderBrandItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noBrandsContainer}>
          <Text>No verified brands available.</Text>
        </View>
      )}
    </View>
  );
};

export default SellerVerifiedBrands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  listContainer: {
    paddingVertical: 10,
  },
  brandItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noBrandsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});



