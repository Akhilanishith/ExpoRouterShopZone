import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import WebNavBar from './../../components/WebNavBar';
import useSetTitle from '../../hooks/useSetTitle';

const Orders = () => {
  useSetTitle("Orders");

  const orders = [
    {
      id: '1',
      name: 'boAt Airdopes 161/163 with ASAP Charge',
      color: 'Black',
      price: '₹905',
      status: 'Delivered on Jul 28',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'SV Collections Decorative Brown Wallpaper',
      color: 'Brown',
      size: 'MEDIUM',
      price: '₹172',
      status: 'Delivered on Jul 25',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '3',
      name: 'Fire-Boltt Ninja Calling Pro Plus 1.83"',
      color: 'Black',
      size: '1.83',
      price: '₹1,109',
      status: 'Delivered on Oct 14, 2023',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '4',
      name: 'Extended Warranty for Smartwatches (1 year)',
      color: null,
      size: null,
      price: '₹69',
      status: 'Delivered on Oct 14, 2023',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },

    {
      id: '5',
      name: 'Extended Warranty for Smartwatches (1 year)',
      color: null,
      size: null,
      price: '₹69',
      status: 'Delivered on Oct 14, 2023',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '6',
      name: 'Extended Warranty for Smartwatches (1 year)',
      color: null,
      size: null,
      price: '₹69',
      status: 'Delivered on Oct 14, 2023',
      ratingText: 'Rate this product now',
      image: 'https://via.placeholder.com/80',
    },
  ];

  const renderOrderItemForWeb = ({ item }) => (
    <View style={styles.webOrderItem}>
      <Image source={{ uri: item.image }} style={styles.webOrderImage} />
      <View style={styles.webOrderDetails}>
        <Text style={styles.webOrderName}>{item.name}</Text>
        {item.color && <Text style={styles.webOrderSubText}>Color: {item.color}</Text>}
        {item.size && <Text style={styles.webOrderSubText}>Size: {item.size}</Text>}
        <Text style={styles.webOrderPrice}>{item.price}</Text>
      </View>
      <View style={styles.webOrderStatus}>
        <Text style={styles.webOrderDeliveryStatus}>{item.status}</Text>
        <Text style={styles.webOrderMessage}>{item.ratingText}</Text>
        <TouchableOpacity>
          <Text style={styles.webReviewButton}>★ Rate & Review Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderItemForAndroid = ({ item }) => (
    <View style={styles.androidOrderItem}>
      <Image source={{ uri: item.image }} style={styles.androidOrderImage} />
      <View style={styles.androidOrderDetails}>
        <Text style={styles.androidOrderStatus}>{item.status}</Text>
        <Text style={styles.androidOrderName}>{item.name}</Text>
        <View style={styles.androidRatingStars}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Text key={index} style={styles.androidStar}>
                ☆
              </Text>
            ))}
        </View>
        <Text style={styles.androidRateNow}>{item.ratingText}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.androidArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBarForWeb = () => (
    <View style={styles.webSearchContainer}>
      <TextInput style={styles.webSearchInput} placeholder="Search your orders here" />
      <TouchableOpacity style={styles.webSearchButton}>
        <Text style={styles.webSearchButtonText}>🔍 Search Orders</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {Platform.OS === 'web' && <WebNavBar />}
      <View style={styles.container}>
        {Platform.OS === 'web' && renderSearchBarForWeb()}
        {Platform.OS === 'android' && (
          <View style={styles.androidSearchContainer}>
            <TextInput style={styles.androidSearchInput} placeholder="Search your order here" />
            <TouchableOpacity style={styles.androidFilterButton}>
              <Text style={styles.androidFilterText}>Filters</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={Platform.OS === 'web' ? renderOrderItemForWeb : renderOrderItemForAndroid}
        />
      </View>
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: Platform.OS === 'web' ? 20 : 0,
    paddingTop: Platform.OS === 'web' ? 20 : 0,
  },

  // Web-specific styles
  webSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  webSearchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  webSearchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  webSearchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  webOrderItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  webOrderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  webOrderDetails: {
    flex: 1,
    marginLeft: 15,
  },
  webOrderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  webOrderSubText: {
    fontSize: 14,
    color: '#666',
  },
  webOrderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  webOrderStatus: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  webOrderDeliveryStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  webOrderMessage: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  webReviewButton: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },

  // Android-specific styles
  androidSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  androidSearchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  androidFilterButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  androidFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  androidOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  androidOrderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  androidOrderDetails: {
    flex: 1,
    marginLeft: 15,
  },
  androidOrderStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  androidOrderName: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  androidRatingStars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  androidStar: {
    fontSize: 20,
    color: '#ddd',
    marginRight: 5,
  },
  androidRateNow: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
  },
  androidArrow: {
    fontSize: 20,
    color: '#333',
  },
});