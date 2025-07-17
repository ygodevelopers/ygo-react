// import { Tabs } from 'expo-router';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import HomeHeader from "@/components/HomeHeader";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: 'blue',
//         headerTitleAlign: 'center',
//         tabBarStyle: {
//           height: 70, // change height of the tab bar
//           paddingHorizontal: 20,
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#ddd',
//         },
//         tabBarItemStyle: {
//           width: 100, // set fixed width per tab item (if you want)
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="pillars"
//         options={{
//           title: 'pillars',
//           headerShown: true,
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="book" size={24} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="chats"
//         options={{
//           title: 'Chats',
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="file-text" size={24} color={color} />
//           )
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: 'Settings',
//           headerShown: true,
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="gear" size={24} color={color} />
//           ),
//         }}
//       />

//     </Tabs>
//   );
// }

import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'blue',

        headerTitleStyle: {
          textAlignVertical: 'center', // vertical centering (Android only)
          lineHeight: 24,              // help with vertical alignment
          fontSize: 18,
          height: 50,                  // optional: define height for better control
        },

        // Custom tab bar container style (narrow)
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: (screenWidth - 250) / 2, // center the tab bar, set your width
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

        tabBarItemStyle: {
          justifyContent: 'center',
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="pillars"
        options={{
          title: 'Pillars',
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
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-text" size={24} color={color} />
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
