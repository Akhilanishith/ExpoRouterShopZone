import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import  WebNavBar from "./../../components/WebNavBar"

export default function Cart() {
  const cartItems = [
    {
      id: '1',
      name: 'boAt Storm Call w/ 4.29 cm(1.69"), BT Calling & 550 Nits',
      description: 'Pitch Black Strap, Free Size',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
    {
      id: '2',
      name: 'Extended Warranty for Smartwatches (1 year)',
      description: '1 Year',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
    {
      id: '3',
      name: '220 TC Microfiber Double Floral Bedsheet',
      description: 'Pack of 1, Grey, Pink',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
    {
      id: '4',
      name: '220 TC Microfiber Double Floral Bedsheet',
      description: 'Pack of 1, Grey, Pink',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
    {
      id: '5',
      name: '220 TC Microfiber Double Floral Bedsheet',
      description: 'Pack of 1, Grey, Pink',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
    {
      id: '6',
      name: '220 TC Microfiber Double Floral Bedsheet',
      description: 'Pack of 1, Grey, Pink',
      image: 'https://via.placeholder.com/80',
      status: 'Out Of Stock',
    },
  ];

  const priceDetails = {
    items: 3,
    price: 13786,
    discount: 11437,
    platformFee: 3,
    deliveryCharges: 0,
    total: 2352,
    savings: 11434,
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemStatus}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <>
    {Platform.OS === "web" && <WebNavBar />}
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        <Text style={styles.title}>Cart</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          ListFooterComponent={<TouchableOpacity style={styles.placeOrderButton}>
            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
          </TouchableOpacity>} />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>PRICE DETAILS</Text>
        <View style={styles.priceDetails}>
          <Text>Price ({priceDetails.items} items)</Text>
          <Text>₹{priceDetails.price}</Text>
        </View>
        <View style={styles.priceDetails}>
          <Text>Discount</Text>
          <Text style={styles.discount}>- ₹{priceDetails.discount}</Text>
        </View>
        <View style={styles.priceDetails}>
          <Text>Platform Fee</Text>
          <Text>₹{priceDetails.platformFee}</Text>
        </View>
        <View style={styles.priceDetails}>
          <Text>Delivery Charges</Text>
          <Text style={styles.freeDelivery}>Free</Text>
        </View>
        <View style={styles.totalAmount}>
          <Text>Total Amount</Text>
          <Text style={styles.total}>₹{priceDetails.total}</Text>
        </View>
        <Text style={styles.savings}>You will save ₹{priceDetails.savings} on this order</Text>
      </View>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'columns',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  cartContainer: {
    flex: Platform.OS === 'web' ? 1 : 2,
    marginRight: Platform.OS === 'web' ? 0 : 7,
  },
  priceContainer: {
    flex: Platform.OS === 'web' ? 0.5 : 1,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemStatus: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  placeOrderButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  discount: {
    color: 'green',
  },
  freeDelivery: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  totalAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  savings: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});