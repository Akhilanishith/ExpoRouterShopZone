import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from './LoginForm';
import { AuthContext } from '../../context/AuthContext';
import LogoutComponent from './LogoutComponent';
import { ScrollView } from 'react-native';
import SellerComponent from './SellerComponent';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function ProfileScreen() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const router = useRouter(); 
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoggedIn ? (
        <ScrollView>
          <SellerComponent />
          <LogoutComponent />
        </ScrollView>
      ) : (
        <LoginForm />
      )}
    </SafeAreaView>
  );
}
