import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Api from '../../service/Api';
import { AuthContext } from '../../context/AuthContext';
import { CustomButton } from '../../components/ActionComponents';
import { useRouter } from 'expo-router';  // Import useRouter from expo-router

export default function RetailShopForm({ modelCloseBtn }) {
  const { token } = useContext(AuthContext);  // Get the token from AuthContext
  const [retailBusinessName, setRetailBusinessName] = useState('');
  const [retailPhoneNumber, setRetailPhoneNumber] = useState('');
  const [retailAddress, setRetailAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();  // Initialize router for navigation

  // Form validation function
  const validateForm = (data) => {
    if (!data.business_name) {
      Alert.alert('Validation Error', 'Business name is required');
      return false;
    }
    if (!data.business_phone_number) {
      Alert.alert('Validation Error', 'Phone number is required');
      return false;
    }
    if (!data.business_address) {
      Alert.alert('Validation Error', 'Business address is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = {
      business_name: retailBusinessName,
      business_phone_number: retailPhoneNumber,
      business_address: retailAddress,
      verification_status: 'pending',
    };

    // Validate the form data
    const isValid = validateForm(data);
    if (!isValid) return;

    try {
      setIsProcessing(true);
      // Send the request to the API
      const response = await axios.post(Api.addRetailSeller, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check the response success and display appropriate message
      if (response.data.success) {
        Alert.alert('Success', 'Retail shop data submitted for approval');
        if (modelCloseBtn) {
          modelCloseBtn(); // Close the modal if the function is passed
        } else {
          router.back(); // Navigate back if no modal close function
        }
      } else {
        Alert.alert('Error', 'Failed to submit Retail shop data');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'Failed to submit retail shop data');
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Retail Shop</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={retailBusinessName}
        onChangeText={setRetailBusinessName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={retailPhoneNumber}
        onChangeText={setRetailPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Business Address"
        value={retailAddress}
        onChangeText={setRetailAddress}
      />

      {isProcessing ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <CustomButton title="S U B M I T" bg="red" txtClr="white" onclick={handleSubmit} />
      )}

      <CustomButton
        title="C L O S E"
        bg="red"
        txtClr="white"
        onclick={modelCloseBtn || router.back}  // Use router.back if no modelCloseBtn is passed
      />
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
