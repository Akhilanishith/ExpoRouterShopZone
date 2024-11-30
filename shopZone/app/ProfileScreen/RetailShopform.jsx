import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator,TouchableOpacity, StyleSheet } from 'react-native';
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
        <ActivityIndicator size="large" color="#FF0000" style={styles.activityIndicator} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S U B M I T</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.button, styles.closeButton]} 
        onPress={modelCloseBtn || router.back}
      >
        <Text style={styles.buttonText}>C L O S E</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    height: 30,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginVertical: 20,
  },
});
