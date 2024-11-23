import { Tabs } from 'expo-router';
import { Home, ShoppingCart, ClipboardList, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  const tabScreens = [
    {
      name: "index",
      title: "Home",
      Icon: Home
    },
    {
      name: "cart",
      title: "Cart",
      Icon: ShoppingCart
    },
    {
      name: "orders",
      title: "Orders",
      Icon: ClipboardList
    },
    {
      name: "profile",
      title: "Profile",
      Icon: Settings
    }
  ];

  // If platform is web, render routes without tabs
  if (Platform.OS === 'web') {
    return (
      <Tabs screenOptions={{
        tabBarStyle: { display: 'none' }, // Hide the tab bar
        headerShown: false // Hide the header if you don't want it on web
      }}>
        {tabScreens.map(({ name, Icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              tabBarButton: () => null, // This removes the tab button
            }}
          />
        ))}
      </Tabs>
    );
  }

  // For mobile platforms, render normal tabs
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#6200EE',
    }}>
      {tabScreens.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Icon color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}