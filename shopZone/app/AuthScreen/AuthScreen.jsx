import React, { useState } from 'react'
import { StyleSheet, View, Alert, ActivityIndicator, Platform, Text } from 'react-native'
import { CustomButton, CustomInput } from '../../components/ActionComponents'
import axios from 'axios'
import Api from '../../service/Api'
import { useRouter } from 'expo-router'

export default function AuthScreen() {
  const [number, setNumber] = useState("")
  const [phoneSubmitLoading, setPhoneSubmitLoading] = useState(false)

  const router = useRouter()

  const handlePhoneSubmit = async () => {
    console.log("Starting phone submission..."); // Debug log
    setPhoneSubmitLoading(true);
  
    try {
      if (number.length !== 10) {
        Alert.alert("Phone must be valid");
        setPhoneSubmitLoading(false);
        return;
      }
  
      console.log("Sending request to:", Api.phoneValidation); // Log request URL
      const res = await axios.post(Api.phoneValidation, { number });
      console.log("API response:", res.data); // Check API response
  
      if (res.data.success) {
        Alert.alert(res.data.message);
        
        router.push({
          pathname: "AuthScreen/OtpVerificationScreen",
          params: { number, emailEmpty: res.data.emailEmpty ,emailExists: res.data.emailExists},
        });
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setPhoneSubmitLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.transparentBox}>
        <Text style={styles.heading}>Enter your phone number</Text>

        <View style={styles.innerContainer}>
          <CustomInput
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            placeholder="Enter number"
            style={styles.input}
          />
          {phoneSubmitLoading ? (
            <ActivityIndicator size={40} color={"red"} style={styles.loader} />
          ) : (
            <CustomButton title={"Submit"} onclick={handlePhoneSubmit} style={styles.button} />

          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  transparentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  innerContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    fontSize: Platform.OS === 'web' ? 16 : 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'web' ? 12 : 10,
  },
  button: {
    width: '100%',
    paddingVertical: Platform.OS === 'web' ? 12 : 10,
  },
  loader: {
    marginTop: 20,
  },
})
