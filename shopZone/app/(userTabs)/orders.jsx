import { StyleSheet, Text, View } from 'react-native';
import WebNavBar from './../../components/WebNavBar';
import React from 'react';
import { Platform } from 'react-native';
import useSetTitle from '../../hooks/useSetTitle';

const Orders = () => {
  useSetTitle("Oredrs");
  return (
    <>
      {Platform.OS === 'web' && <WebNavBar />}
      <View>
        <Text>orders</Text>
      </View>
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({});
