import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import WebNavBar from './../../components/WebNavBar';
import useSetTitle from '../../hooks/useSetTitle';

const Profile = () => {
  // Set the title for the page
  useSetTitle("Profile");

  return (
    <View style={styles.container}>
      {/* Only render WebNavBar on the web platform */}
      {Platform.OS === 'web' && <WebNavBar />}
      
      {/* Render the ProfileScreen */}
      <ProfileScreen />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
