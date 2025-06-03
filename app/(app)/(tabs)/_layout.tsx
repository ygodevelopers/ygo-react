import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeHeader from "@/components/HomeHeader";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerTitleAlign: 'center'
      }}
    >
      <Tabs.Screen
        name="pillars"
        options={{
          title: 'pillars',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-text" size={24} color={color} />
          ),
          header: () => <HomeHeader/>
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

