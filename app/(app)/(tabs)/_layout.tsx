import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Dimensions } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

function CustomTabBar(props: any) {
  const tabBarWidth = 250; // fixed compact size
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        left: (screenWidth - tabBarWidth) / 2, // force center
        width: tabBarWidth,
        borderRadius: 20,
        overflow: 'hidden', // round corners
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      }}
    >
      <BottomTabBar {...props} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'purple',
        tabBarStyle: {
          height: 80, // height of the inner bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: 'center',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
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
