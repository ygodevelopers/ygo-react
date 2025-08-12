import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const { width: screenWidth } = useWindowDimensions();
  
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'purple',

        headerTitleStyle: {
          textAlignVertical: 'center',
          lineHeight: 24,
          fontSize: 18,
          height: 50,
        },

        // Custom tab bar container style
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: (screenWidth - 250) / 2, // Back to calculated centering
          width: 250,
          height: 80,
          borderRadius: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 10,

        },

        // Center each tab item
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
        },

        // Center the label text
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: 'center',
          marginTop: 4,
        },

        // Center the icon
        tabBarIconStyle: {
          marginBottom: 0,
        },

        // Ensure the tab bar shows labels
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="pillars"
        options={{
          title: 'Pillars',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="building-columns" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}