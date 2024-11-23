import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Home,  ClipboardList, Settings, Award, NotebookPen, ChartNoAxesCombined } from 'lucide-react-native';

export default function Component() {


  

  if (Platform.OS === "web") {
    return (
      <Drawer>
        <Drawer.Screen
          name="SellerProductScreen"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <Home color={color} size={size} />
              
            ),
          }}
        />
        <Drawer.Screen
          name="SellerBrandScreen"
          options={{
            drawerLabel: 'Brand',
            title: 'Brand',
            drawerIcon: ({ color, size }) => (
              <Award  color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="SellerOrdersScreen"
          options={{
            drawerLabel: 'Orders',
            title: 'Orders',
            drawerIcon: ({ color, size }) => (
              <NotebookPen color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="SellerAnalyticsScreen"
          options={{
            drawerLabel: 'rAnalytics',
            title: 'Analytics',
            drawerIcon: ({ color, size }) => (
              <ChartNoAxesCombined color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="SellerProductScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="SellerBrandScreen"
        options={{
          title: 'Brand',
          tabBarIcon: ({ color, size }) => (
            <Award  color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="SellerOrdersScreen"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <NotebookPen color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="SellerAnalyticsScreen"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}