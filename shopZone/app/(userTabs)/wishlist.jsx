import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import WebNavBar from './../../components/WebNavBar';
import useSetTitle from '../../hooks/useSetTitle';

import WishlistScreen from '../Wishlist';

const Profile = () => {

  return (
    <View style={styles.container}>
      {/* Only render WebNavBar on the web platform */}
      {Platform.OS === 'web' && <WebNavBar />}
      
      {/* Render the ProfileScreen */}
      <WishlistScreen />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});