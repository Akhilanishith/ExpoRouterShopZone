// app/seller-orders/index.js
'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SellerOrdersScreen() {
  const [orders, setOrders] = useState([
    { id: '1', customer: 'John Doe', total: 99.99, status: 'Pending' },
    { id: '2', customer: 'Jane Smith', total: 149.99, status: 'Shipped' },
    { id: '3', customer: 'Bob Johnson', total: 79.99, status: 'Delivered' },
    { id: '4', customer: 'Alice Brown', total: 199.99, status: 'Pending' },
    { id: '5', customer: 'Charlie Davis', total: 59.99, status: 'Shipped' },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const filteredOrders = orders.filter((order) =>
    filterStatus === 'All' ? true : order.status === filterStatus
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View>
        <Text style={styles.customerName}>{item.customer}</Text>
        <Text style={styles.orderId}>Order #{item.id}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffa500';
      case 'Shipped':
        return '#4a90e2';
      case 'Delivered':
        return '#4caf50';
      default:
        return 'black';
    }
  };

  const FilterModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Orders</Text>
          {['All', 'Pending', 'Shipped', 'Delivered'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterOption, filterStatus === status && styles.selectedFilter]}
              onPress={() => {
                setFilterStatus(status);
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={[styles.filterOptionText, filterStatus === status && styles.selectedFilterText]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFilterModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />
      <FilterModal />
    </View>
  );
}

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
  filterButton: {
    padding: 5,
  },
  orderList: {
    padding: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  filterOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedFilter: {
    backgroundColor: '#e6f2ff',
  },
  filterOptionText: {
    fontSize: 16,
  },
  selectedFilterText: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
