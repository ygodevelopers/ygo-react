import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions, FlatList } from 'react-native';
import { Pillar } from '@/types';
import { UserList } from "@/components/UserList";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {usePillar} from '@/context/pillarContext';





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

  return (
    <>
      <Stack.Screen options={{
          title: '',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
              <View className="flex-row items-center justify-between">
                  <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.title}>{"<"}Pillars</Text>
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

      <View style={styles.container}>
        {hasSubPillars ? (
          <FlatList
            data={currentPillar?.subPillars}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={true} // 可选，开发调试可开启
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
                  width: 160, // 固定宽度，适合横向排列
                  height: 60,
                  borderWidth: 1,
                  borderColor: '#aaa',
                  borderRadius: 12,
                  backgroundColor: '#f5f5f5',
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