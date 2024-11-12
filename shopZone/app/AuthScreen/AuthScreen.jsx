'use client'

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, ActivityIndicator, Platform, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import axios from 'axios'
import Api from '../../service/Api'

export default function Component() {
  const [number, setNumber] = useState("")
  const [phoneSubmitLoading, setPhoneSubmitLoading] = useState(false)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)
  const router = useRouter()

  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width)
    }

    const dimensionListener = Dimensions.addEventListener('change', updateLayout)

    return () => {
      dimensionListener?.remove() // Updated to remove the event listener correctly
    }
  }, [])

  const handlePhoneSubmit = async () => {
    setPhoneSubmitLoading(true);

    try {
      if (number.length !== 10) {
        Alert.alert("Phone must be valid");
        setPhoneSubmitLoading(false);
        return;
      }

      const res = await axios.post(Api.phoneValidation, { number });

      if (res.data.success) {
        Alert.alert(res.data.message);

        router.push({
          pathname: "AuthScreen/OtpVerificationScreen",
          params: { number, emailEmpty: res.data.emailEmpty, emailExists: res.data.emailExists },
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

  const isMobile = screenWidth < 768

  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, isMobile && styles.cardContainerMobile]}>
        <View style={[styles.leftContainer, isMobile && styles.leftContainerMobile]}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subheading}>Get access to your Orders, Wishlist and Recommendations</Text>
        </View>
        
        <View style={[styles.rightContainer, isMobile && styles.rightContainerMobile]}>
          <TextInput
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            placeholder="Enter Email/Mobile number"
            style={styles.input}
          />
          <Text style={styles.termsText}>
            By continuing, you agree to ShopZone's{' '}
            <Text style={styles.linkText} onPress={() => Alert.alert('Terms of Use')}>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text style={styles.linkText} onPress={() => Alert.alert('Privacy Policy')}>
              Privacy Policy
            </Text>.
          </Text>
          {phoneSubmitLoading ? (
            <ActivityIndicator size="large" color="#f4511e" style={styles.loader} />
          ) : (
            <TouchableOpacity onPress={handlePhoneSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Request OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    height: Platform.OS === "web" ? '60%' : 400,
  },
  cardContainerMobile: {
    flexDirection: 'column',
    width: '100%',
  },
  leftContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
  },
  leftContainerMobile: {
    width: '100%',
  },
  rightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  rightContainerMobile: {
    width: '100%',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: '#ffffff',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CED0CE',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#878787',
    marginBottom: 20,
  },
  linkText: {
    color: '#2874f0',
  },
  button: {
    backgroundColor: '#fb641b',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
  },
})
