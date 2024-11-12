import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const SellerDashboard = () => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isWideScreen = width > 768;

  const renderNavItem = (icon, label, href) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.navItem}>
        {icon}
        <Text style={[styles.navText, !isWeb && !isWideScreen ? styles.mobileNavText : {}]}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isWeb && isWideScreen ? (
        // Sidebar and Main Content for Web on Wide Screens
        <View style={styles.webContainer}>
          <View style={styles.sidebar}>
            {renderNavItem(<Ionicons name="list-outline" size={24} color="white" />, 'Orders', '../SellerOrdersScreen/SellerOrdersScreen')}
            {renderNavItem(<Ionicons name="cube-outline" size={24} color="white" />, 'Products', '../SellerProductsScreen/SellerProductScreen')}
            {renderNavItem(<SimpleLineIcons name="badge" size={24} color="white" />, 'Brand', '../SellerBrandScreen/SellerBrandScreen')}
            {renderNavItem(<Ionicons name="stats-chart-outline" size={24} color="white" />, 'Analytics', '../SellerAnalyticsScreen/SellerAnalyticsScreen')}
          </View>
          <View style={styles.mainContent}>
            {/* Main content goes here */}
            <Text style={styles.contentText}>Welcome to the Seller Dashboard</Text>
          </View>
        </View>
      ) : (
        // Bottom Tab bar for Mobile or Small Screens
        <View style={styles.tabBar}>
          {renderNavItem(<Ionicons name="list-outline" size={24} color="black" />, 'Orders', '../SellerOrdersScreen/SellerOrdersScreen')}
          {renderNavItem(<Ionicons name="cube-outline" size={24} color="black" />, 'Products', '../SellerProductsScreen/SellerProductScreen')}
          {renderNavItem(<SimpleLineIcons name="badge" size={24} color="black" />, 'Brand', '../SellerBrandScreen/SellerBrandScreen')}
          {renderNavItem(<Ionicons name="stats-chart-outline" size={24} color="black" />, 'Analytics', '../SellerAnalyticsScreen/SellerAnalyticsScreen')}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#2c3e50', // Dark background for sidebar
    paddingVertical: 20,
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: '#34495e',
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    backgroundColor: 'white',
    position: 'absolute', // Fix the tab bar at the bottom
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flexDirection: 'column', // Vertical alignment of icon and text for mobile
    alignItems: 'center',
    paddingVertical: 5,
  },
  navText: {
    color: 'white', // Default white text for sidebar
    fontSize: 16,
    marginTop: 5, // Spacing between icon and text for mobile
  },
  mobileNavText: {
    color: 'black', // Black text for mobile bottom tab
    fontSize: 12, // Smaller font size for mobile
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SellerDashboard;
