import { Contact,User } from "@/types";
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from "expo-router";
import { usePillar } from '@/context/pillarContext';
import { getDocs, setDoc, doc, query, where, updateDoc ,arrayUnion } from 'firebase/firestore'
import { contactCollection, userRef } from '@/firebaseConfig';
import {AlphabetList, IData} from 'react-native-section-alphabet-list';
import { useAuth } from '@/context/authContext';
import ContactByPillar from "@/components/contactByPillar";

export default function PillarContact() {
  const router = useRouter();


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
      addSubPillar
      } = usePillar();

  

  const handleSubPillar = () => {
    setsubpillar(true);
    // savePillars(uuidv4(), pillarname, selectedColor, selectedicon);
    // getPillars();
    // setModalNewVisible(false);
    setModalNewVisible(true);
    
  };

    const sendToChatRoom = (item: IData) => {
        router.replace({pathname: '/(app)/chatRoom', params: {contactID: item.key}});
    }

  return (
    <>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 }}>

        <Text style={{
          fontSize: hp(3),
          letterSpacing: 1,
          textAlign: 'center',
        }}>Actions</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <View style={{flex: 1, width: '100%', alignItems: 'center' }}>
        {/* <Text style={[styles.title]}>Actions</Text> */}
        <TouchableOpacity onPress={() => {router.push('/newGroupChat')}}>  
          <View style={styles.container} >
            <Text style={styles.icon}>🎎</Text>
            <Text style={styles.title}>New Group Chat</Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => handleSubPillar()}>  
          <View style={styles.container} >
            <Text style={styles.icon}>📁</Text>
            <Text style={styles.title}>New Sub-pillar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('/AddContact')}}>  
          <View style={styles.container} >
            <Text style={styles.icon}>✉️</Text>
            <Text style={styles.title}>Add New Contact By Email</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, width: '100%', alignItems: 'center' }}>
        <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >CONTACTS:</Text>
        <ContactByPillar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
              flexDirection: 'row',
              padding: 10, 
              marginHorizontal: 10,
              marginVertical: 5, 
              width: 350,
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 12,
              gap: 8},
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});