import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Modal, FlatList } from 'react-native';
import { Pillar } from '@/types';
import { UserList } from "@/components/UserList";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {usePillar} from '@/context/pillarContext';
import ContactByPillar from '@/components/contactByPillar';

export default function newGroupChat ()  {
  const {         
    currentPillar
    } = usePillar();


  const router = useRouter();

  const hasSubPillars = currentPillar.subPillars && currentPillar.subPillars.length > 0;
  const [modalcontactVisible, setModalContact] = useState(false);

  return (
    <>
      <Stack.Screen options={{
          title: '',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
              <View className="flex-row items-center justify-between">
                  <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.title}>{"<"}cancel</Text>
                  </TouchableOpacity>
              </View>
          ),
          headerTitle: () => (
              <Text style={[styles.icon, { textAlign: 'center', width: '100%' }]}>New Group Chat</Text>
          ),

      }}>

      </Stack.Screen>

      <ContactByPillar />
      <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >CONTACTS</Text>
      <View style={styles.container}>
        <Text style={[styles.title, { marginLeft:20 }]} >Create Group Chat</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});