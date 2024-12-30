import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceDetails = ({ items, totalPrice, discount, deliveryCharges, totalAmount, savings }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PRICE DETAILS</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Price ({items} item{items > 1 ? 's' : ''})</Text>
        <Text style={styles.value}>{`₹${totalPrice.toFixed(2)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Discount</Text>
        <Text style={[styles.value, styles.discount]}>{`− ₹${discount.toFixed(2)}`}</Text>
      </View>
      <View style={styles.row}>
  <Text style={styles.label}>Delivery Charges</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {deliveryCharges === 0 && (
      <Text style={[styles.value, styles.strikethrough]}>
        ₹40
      </Text>
    )}
    <Text style={[styles.value, deliveryCharges === 0 ? styles.free : null, { marginLeft: 5 }]}>
      {deliveryCharges === 0 ? 'FREE Delivery' : `₹${deliveryCharges.toFixed(2)}`}
    </Text>
  </View>
</View>

      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>{`₹${totalAmount.toFixed(2)}`}</Text>
      </View>
      <View style={styles.savings}>
        <Text style={styles.savingsText}>
          You will save ₹{savings.toFixed(2)} on this order
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  //   padding: 16,
  //   marginBottom: 16,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   shadowOffset: { width: 0, height: 2 },
  //   elevation: 3,
  // },

    container: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      width: '100%', // Full width for mobile
    },
    webContainer: {
      width: '100%', // Adjust as needed for web layout
    },
    // Other styles remain unchanged

  
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  discount: {
    color: '#FF5722',
  },
  free: {
    color: '#4CAF50',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  savings: {
    marginTop: 16,
  },
  savingsText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
  },
  strikethrough: {
  textDecorationLine: 'line-through',
  color: '#888', // Optional: Lighter color for strikethrough text
},

});

export default PriceDetails;
