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
          // currentPillar?.subPillars.map((sub:Pillar, index:number) => (
            <>

              <View className = "flex-1">
                  <FlatList
                      data = {currentPillar?.subPillars}
                      contentContainerStyle = {{flex:1, paddingVertical: 55}}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={2}
                      showsVerticalScrollIndicator = {false}
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      renderItem={({item, index})=>(          
                          // <TouchableOpacity onPress={setcurrentPillar} activeOpacity={0.7}>
                            <View style={{
                                flexDirection: 'row',
                                padding: 10, 
                                marginHorizontal: 10,
                                marginVertical: 5, 
                                width: 300,
                                borderWidth: 1,
                                borderColor: '#aaa',
                                borderRadius: 12,
                                gap: 8,}} >

                                    <Text style={{ fontSize: 24, marginRight: 8, borderWidth: 1, borderColor: 'black', borderRadius: 5 ,backgroundColor:'gray'}}>{item?.icon}</Text>
   
                                    <Text>{item?.title}</Text>
                            </View>
                        // </TouchableOpacity>
                        )}
                      />

              </View>
            </>
          
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});