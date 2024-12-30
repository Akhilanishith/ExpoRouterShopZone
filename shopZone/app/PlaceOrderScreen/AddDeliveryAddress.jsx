import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';
import { AuthContext } from '../../context/AuthContext';

const AddDeliveryAddress = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
const {productId} = useLocalSearchParams()
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'Home',
  });

  const handleSaveAddress = async () => {
    if (!token) {
      Alert.alert('Error', 'Please log in first.');
      return;
    }

    try {
      const response = await axios.post(
        `${Api.addDeliveryAddress}`,
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
       
        console.log(response.data.success)
        Alert.alert('Success', 'Address added successfully!');
        router.push({
          pathname: '../PlaceOrderScreen/',
          params: { productId: productId },
        });
        console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]")
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add address.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        keyboardType="number-pad"
        value={form.mobile}
        onChangeText={(text) => setForm({ ...form, mobile: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        keyboardType="number-pad"
        value={form.pincode}
        onChangeText={(text) => setForm({ ...form, pincode: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.city}
        onChangeText={(text) => setForm({ ...form, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={form.state}
        onChangeText={(text) => setForm({ ...form, state: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark (Optional)"
        value={form.landmark}
        onChangeText={(text) => setForm({ ...form, landmark: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AddDeliveryAddress;