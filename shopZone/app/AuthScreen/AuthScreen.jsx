'use client'

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
    console.log("Starting phone submission...")
    setPhoneSubmitLoading(true)

    try {
      if (number.length !== 10) {
        Alert.alert("Phone must be valid")
        setPhoneSubmitLoading(false)
        return
      }

      console.log("Sending request to:", Api.phoneValidation)
      const res = await axios.post(Api.phoneValidation, { number })
      console.log("API response:", res.data)

      if (res.data.success) {
        Alert.alert(res.data.message)

        router.push({
          pathname: "AuthScreen/OtpVerificationScreen",
          params: { number, emailEmpty: res.data.emailEmpty, emailExists: res.data.emailExists },
        })
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      console.error("Error during submission:", error)
    } finally {
      setPhoneSubmitLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : (
            <CustomButton title="Submit" onclick={handlePhoneSubmit} style={styles.button} />
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
    backgroundColor: '#F0F4F8',
    width: '100%',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  innerContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    color: '#333333',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 24,
  },
})