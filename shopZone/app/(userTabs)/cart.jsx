import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import WebNavBar from './../../components/WebNavBar';
import useSetTitle from '../../hooks/useSetTitle';
import CartScreen from '../CartScreen';

const Profile = () => {

  return (
    <View style={styles.container}>
      {/* Only render WebNavBar on the web platform */}
      {Platform.OS === 'web' && <WebNavBar />}
      
      {/* Render the ProfileScreen */}
      <CartScreen />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});