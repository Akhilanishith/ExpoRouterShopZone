import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const SellerDashboard = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Link href="../SellerOrdersScreen/SellerOrdersScreen">
            <Ionicons name="list-outline" size={24} color="black" />
            <Text style={styles.navText}>Orders</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="../SellerProductsScreen/SellerProductScreen">
            <Ionicons name="cube-outline" size={24} color="black" />
            <Text style={styles.navText}>Products</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="../SellerBrandScreen/SellerBrandScreen">
            <SimpleLineIcons name="badge" size={24} color="black" />
            <Text style={styles.navText}>Brand</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Link href="../SellerAnalyticsScreen/SellerAnalyticsScreen">
            <Ionicons name="stats-chart-outline" size={24} color="black" />
            <Text style={styles.navText}>Analytics</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'black',
  },
});

export default SellerDashboard;
