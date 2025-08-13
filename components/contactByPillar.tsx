import { Contact,User } from "@/types";
import { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDocs, setDoc, doc, query, where, updateDoc ,arrayUnion } from 'firebase/firestore'
import { contactCollection, userRef } from '@/firebaseConfig';
import {AlphabetList, IData} from 'react-native-section-alphabet-list';
import { useAuth } from '@/context/authContext';
import {usePillar} from '@/context/pillarContext';
import { Router, useRouter } from "expo-router";

export default function ContactByPillar(){

  const router = useRouter();

  const {user} = useAuth();

  const {
      currentPillar,
      currentThread
    } = usePillar();

  const [userContacts, setUserContacts] = useState<User[]>();
  useEffect(() => {
        getContacts();
    }, []);
  
  const getContacts = async () => {
    try {
        const contactsContainer : Contact[] = [];
        const q = query(contactCollection, where('ownerId', '==', user.id),where('pillarId', 'array-contains', currentPillar?.id));
        const qSnapshot = await getDocs(q);
        qSnapshot.forEach((doc) => {
          contactsContainer.push(doc.data() as Contact)
        });
        getUsersFromContacts(contactsContainer);
    } catch (error) {
        console.error("Error fetching contact:", error);
    }
  }

  const getUsersFromContacts = async (contacts: Contact[]) => {
      const promises = contacts.map(async (contact) => {
          const q = query(userRef, where('id', '==', contact.contactUserId));
          const qSnapshot = await getDocs(q);
          const user : User[] = [];
          qSnapshot.forEach((doc) => {
              user.push(doc.data() as User);
          })
          return user;
      });

      const result = await Promise.all(promises);
      const usersContainer : User[] = result.flat();
      setUserContacts(usersContainer);
  }
return (
    <View style={styles.container} >
    {
          userContacts && 
          <FlatList
            data = {userContacts}
            contentContainerStyle = {{flex:1, paddingVertical: 55}}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator = {false}
            renderItem={({item, index})=>(          
                // <TouchableOpacity onPress={() => router.push({ params: { contactID: item.id, threadID: null }, pathname: '/(app)/ContactView' })}>
                <TouchableOpacity onPress={() => router.push({ pathname: '/(app)/chatRoom', params: { threadID: currentThread?.id, contactName: item?.firstName, contactID: item?.id } })}>
                 
                  <View style={{
                      flexDirection: 'row',
                      padding: 10, 
                      marginHorizontal: 10,
                      marginVertical: 5, 
                      width: 300,

                      gap: 8,}} >

                          <Image source={item?.profileImageUrl ? { uri: item.profileImageUrl } : undefined} style={{borderRadius: 100, height: hp(4.5), aspectRatio: 1}}/>

                          <Text>{item?.firstName} {item?.lastName}</Text>
                  </View>
               </TouchableOpacity>
              )}
            />
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
              flexDirection: 'row',
              padding: 10, 
              marginHorizontal: 10,
              marginVertical: 5, 
              width: 350,

              gap: 8},
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});