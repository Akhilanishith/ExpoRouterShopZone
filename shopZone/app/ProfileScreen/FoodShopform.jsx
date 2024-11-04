import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Api from '../../service/Api';
import { AuthContext } from '../../context/AuthContext';
import { CustomButton } from '../../components/ActionComponents';
import { useRouter } from 'expo-router';  // Import router for navigation

export default function FoodShopForm({ route, modelCloseBtn }) {
  const { token } = useContext(AuthContext);  // Get the token from AuthContext
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantPhoneNumber, setRestaurantPhoneNumber] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();  // Initialize router for navigation

  const validateForm = (data) => {
    if (!data.restaurant_name) {
      Alert.alert('Validation Error', 'Restaurant name is required');
      return false;
    }
    if (!data.restaurant_phone_number) {
      Alert.alert('Validation Error', 'Phone number is required');
      return false;
    }
    if (!data.restaurant_address) {
      Alert.alert('Validation Error', 'Restaurant address is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const data = {
      restaurant_name: restaurantName,
      restaurant_phone_number: restaurantPhoneNumber,
      restaurant_address: restaurantAddress,
      verification_status: 'pending',
    };

    // Validate form data
    const isValid = validateForm(data);
    if (!isValid) return;

    try {
      setIsProcessing(true);
      // Send the request to the API
      const response = await axios.post(Api.addFoodSeller, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check the response success and display appropriate message
      if (response.data.success) {
        Alert.alert('Success', 'Food shop data submitted for approval');
        if (modelCloseBtn) {
          modelCloseBtn(); // Close the modal on success if the function is passed
        } else {
          router.back(); // If no modal close function, navigate back
        }
      } else {
        Alert.alert('Error', 'Failed to submit food shop data');
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error', 'Failed to submit food shop data');
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Shop</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurantName}
        onChangeText={setRestaurantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={restaurantPhoneNumber}
        onChangeText={setRestaurantPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Address"
        value={restaurantAddress}
        onChangeText={setRestaurantAddress}
      />
      
      {isProcessing ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <CustomButton title="S U B M I T" bg="green" txtClr="white" onclick={handleSubmit} />
      )}
      
      <CustomButton title="C L O S E" bg="red" txtClr="white" onclick={modelCloseBtn || router.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '80%',
  },
});
