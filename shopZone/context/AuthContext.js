import React, { createContext, useState, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { usePushNotifications } from '../service/notificationService';

export const AuthContext = createContext(); // Named export

const AuthProvider = ({ children }) => {
  const expoPushToken = Platform.OS !== 'web' ? usePushNotifications().expoPushToken : null;
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null); // New state for extracted data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('userToken');
    } else {
      return await SecureStore.getItemAsync('userToken');
    }
  };

  const saveToken = async (jwtToken) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('userToken', jwtToken);
    } else {
      await SecureStore.setItemAsync('userToken', jwtToken);
    }
  };

  const removeToken = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('userToken');
    } else {
      await SecureStore.deleteItemAsync('userToken');
    }
  };

  // Function to decode JWT and extract payload
  const decodeJWT = (jwtToken) => {
    try {
      const payload = jwtToken.split('.')[1]; // Get the payload part
      const decodedPayload = atob(payload); // Decode base64
      return JSON.parse(decodedPayload); // Parse JSON
    } catch (error) {
      console.error("Invalid JWT token:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        const decodedData = decodeJWT(storedToken);
        setUserData(decodedData); // Set extracted data
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (jwtToken) => {
    await saveToken(jwtToken);
    setToken(jwtToken);
    const decodedData = decodeJWT(jwtToken);
    setUserData(decodedData); // Set extracted data
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setUserData(null); // Clear user data
    setIsLoggedIn(false);
  };

  const authContextValue = {
    token,
    isLoggedIn,
    userData, // Expose extracted data in the context
    login,
    logout,
    isLoading,
    expoPushToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
