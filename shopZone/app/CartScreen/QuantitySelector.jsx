
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onDecrease}
        disabled={quantity <= 1}
      >
        <Text style={[styles.buttonText, quantity <= 1 && styles.disabledText]}>−</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
  disabledText: {
    color: '#ccc',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 12,
    width: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingVertical: 4,
    color: '#333',
  },
});

export default QuantitySelector;
