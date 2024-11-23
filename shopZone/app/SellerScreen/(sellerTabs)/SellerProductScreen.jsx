// File: pages/products.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const SellerProductsScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: '1', name: 'Wireless Earbuds', price: 79.99, stock: 50, image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSPvXk7i8IQCW41C__jIapq8bPzO9b1q3S_mPjRYX0w3_H3MNX5nkhywpb91vkHTil-mDp1eaSygvR9_Fqz8Ezj5lJM6R_QZtbTuz9TqJilhbtvqIj9BO07BuY' },
    { id: '2', name: 'Smart Watch', price: 199.99, stock: 30, image: 'https://justintime.in/cdn/shop/products/A832_1.jpg' },
    { id: '3', name: 'Bluetooth Speaker', price: 59.99, stock: 75, image: 'https://example.com/speaker.jpg' },
    { id: '4', name: 'Laptop Stand', price: 29.99, stock: 100, image: 'https://example.com/laptopstand.jpg' },
    { id: '5', name: 'Phone Case', price: 19.99, stock: 200, image: 'https://example.com/phonecase.jpg' },
    { id: '6', name: 'Smart Home Thermostat', price: 99.99, stock: 150, image: 'https://example.com/thermostat.jpg' },
    { id: '7', name: 'Smart Home Switch', price: 49.99, stock: 250, image: 'https://example.com/smartswitch.jpg' },
  ]);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productStock}>In Stock: {item.stock}</Text>
      </View>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => router.push(`/${item.id}`)}
      >
        <Ionicons name="create-outline" size={24} color="#4a90e2" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Products</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('./SellerAddProduct')}



        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4a90e2',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    padding: 5,
  },
  productList: {
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "contain",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#4a90e2',
    marginTop: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  editButton: {
    padding: 5,
  },
});

export default SellerProductsScreen;
