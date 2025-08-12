import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput, FlatList } from 'react-native';
import { Pillar } from '@/types';
import { UserList } from "@/components/UserList";
import { useRouter } from 'expo-router';
import { Stack } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {usePillar} from '@/context/pillarContext';
import Ionicons from '@expo/vector-icons/Ionicons';




export default function pillarDetail ()  {

  const {         
    selectedColor, 
    pillarname, 
    selectedicon,
    getPillars,
    savePillars,
    modalNewVisible,
    setModalNewVisible,
    subpillar,
    setsubpillar,
    addSubPillar,
    currentPillar,
    setcurrentPillar
    } = usePillar();


  const router = useRouter();

  console.log("PillarDetail item id: ", currentPillar.id);
  const hasSubPillars = currentPillar.subPillars && currentPillar.subPillars.length > 0;
  console.log("PillarDetail subpillars: ", hasSubPillars);
  const [modalcontactVisible, setModalContact] = useState(false);

  const searchpillarName = (text: string) => {
    // Update the pillar name state
    setcurrentPillar((prev: Pillar) => ({ ...prev, title: text }));
  };

  return (
    <>
      <Stack.Screen options={{
          title: '',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
              <View className="flex-row items-center justify-between">
                  <TouchableOpacity onPress={() => router.back()}>
                      <Ionicons name="arrow-back" size={24} color="black" />
                      <Text style={styles.title}>Pillars</Text>
                  </TouchableOpacity>
              </View>
          ),
          headerTitle: () => (
              <Text style={[styles.icon, { textAlign: 'center', width: '100%' }]}>{currentPillar.icon} {currentPillar.Title}</Text>
          ),
          headerRight: () => (
              <TouchableOpacity onPress={() => {router.push('/(app)/pillarContact')}}>   
              
                  <FontAwesome name="plus" size={28} color="purple" />
              </TouchableOpacity>
          ), 
      }}>

      </Stack.Screen>
      <TextInput
              style={{borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 10,
                      fontSize: 16,
                      borderRadius: 6,
                      marginBottom: 20,}}
              placeholder="Search"
              value={pillarname}
              onChangeText={searchpillarName}
          />

      <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >Sub-pillars</Text>

      <View style={styles.container}>
        {hasSubPillars ? (
          <FlatList
            data={currentPillar?.subPillars}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={true} // optional，may enable for debug
            contentContainerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  marginHorizontal: 8,
                  width: 160, // fiexd width, Suitable for horizontal arrangement
                  height: 60,
                  borderWidth: 1,
                  borderColor: '#aaa',
                  borderRadius: 12,
                  backgroundColor: 'white',
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    width: 40,
                    borderWidth: 3,
                    borderColor: item.color || 'gray',
                    borderRadius: 10,                
                  }}
                >
                  {item?.icon}
                </Text>
                <Text>{item?.title}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ color: 'gray' }}>No subpillars</Text>
        )}
      </View>
      <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >Chats</Text>
      <View style={styles.container}>
        <UserList pillarid={currentPillar.id} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 8 },
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});