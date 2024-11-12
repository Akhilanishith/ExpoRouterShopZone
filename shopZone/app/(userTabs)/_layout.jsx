import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Home, ShoppingCart, ClipboardList, Settings } from 'lucide-react-native';

export default function Component() {


  

  if (Platform.OS === "web") {
    return (
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <Home color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            drawerLabel: 'Cart',
            title: 'Cart',
            drawerIcon: ({ color, size }) => (
              <ShoppingCart color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="orders"
          options={{
            drawerLabel: 'Orders',
            title: 'Orders',
            drawerIcon: ({ color, size }) => (
              <ClipboardList color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'profile',
            title: 'profile',
            drawerIcon: ({ color, size }) => (
              <Settings color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
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