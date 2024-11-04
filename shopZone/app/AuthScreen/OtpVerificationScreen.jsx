


import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Api from '../../service/Api';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

const OtpVerificationScreen = () => {
  const { login } = useContext(AuthContext);
  const { number, emailEmpty, emailExists } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const router = useRouter();

  // Convert emailEmpty and emailExists to boolean
  const emailEmptyBool = emailEmpty === 'true';
  const emailExistsBool = emailExists === 'true';

//   // useEffect to check whenever number, emailEmpty, or emailExists changes
//   useEffect(() => {
//     console.log('Number:', number);
//     console.log('Email Exists:', emailExistsBool);
//     console.log('Email Empty:', emailEmptyBool);
//   }, [number, emailExistsBool, emailEmptyBool]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (number.length !== 10) {
      Alert.alert('Invalid phone number.');
      return;
    }

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Alert.alert('Please enter the 4-digit OTP.');
      return;
    }

    if (emailEmptyBool && !email) {
      Alert.alert('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post(Api.otpValidation, {
        number,
        otp: enteredOtp,
        email: emailExistsBool ? undefined : email,
      });

      const result = response.data;

      if (result.success) {
        login(result.token);

        if (result.isSeller) {
          router.push('/SellerComponent');
        } else {
          router.push('/(userTabs)');
        }
      } else {
        Alert.alert(result.message);
      }
    } catch (error) {
      Alert.alert('Invalid OTP or validation error.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>

      {!emailExistsBool && emailEmptyBool && (
        <TextInput
          style={styles.emailInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      )}

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>

      <Text style={styles.subtitle}>OTP sent to {number}</Text>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  emailInput: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
