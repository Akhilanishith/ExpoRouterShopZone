import React, { createContext, useState, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { usePushNotifications } from '../service/notificationService';

export const AuthContext = createContext();  // Named export

const AuthProvider = ({ children }) => {
  // Conditionally get expoPushToken if not on web platform
  const expoPushToken = Platform.OS !== 'web' ? usePushNotifications().expoPushToken : null;
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get token based on platform
  const getToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('userToken');
    } else {
      return await SecureStore.getItemAsync('userToken');
    }
  };

  // Function to save token based on platform
  const saveToken = async (jwtToken) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('userToken', jwtToken);
    } else {
      await SecureStore.setItemAsync('userToken', jwtToken);
    }
  };

  // Function to remove token based on platform
  const removeToken = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('userToken');
    } else {
      await SecureStore.deleteItemAsync('userToken');
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (jwtToken) => {
    await saveToken(jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setIsLoggedIn(false);
  };

  const authContextValue = { 
    token, 
    isLoggedIn, 
    login, 
    logout, 
    isLoading, 
    expoPushToken // Directly add expoPushToken here in the context
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
