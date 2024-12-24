import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Api from '../../service/Api';

const CartItemList = ({ cartItems }) => {
  return (
    <>
      {cartItems.map((item, index) => (
        <View style={styles.card} key={index}>
        <Image
                    source={{ uri: Api.main + (item.images?.[0] || '') }}
                    style={styles.productImage}
                   />
          <View style={styles.productInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.sellingPrice}>{`₹${item.sellingPrice.toFixed(2)}`}</Text>
              <Text style={styles.originalPrice}>{`₹${item.originalPrice.toFixed(2)}`}</Text>
            </View>
            <Text style={styles.discount}>{`You saved ₹${(
              (item.originalPrice - item.sellingPrice) * item.quantity
            ).toFixed(2)}`}</Text>
            <Text style={styles.itemTotal}>{`Total: ₹${(
              item.sellingPrice * item.quantity
            ).toFixed(2)}`}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  sellingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: '#FF5722',
    marginTop: 4,
  },
  itemTotal: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});

export default CartItemList;
