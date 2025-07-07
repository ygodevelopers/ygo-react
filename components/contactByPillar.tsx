import { Contact,User } from "@/types";
import { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDocs, setDoc, doc, query, where, updateDoc ,arrayUnion } from 'firebase/firestore'
import { contactCollection, userRef } from '@/firebaseConfig';
import {AlphabetList, IData} from 'react-native-section-alphabet-list';
import { useAuth } from '@/context/authContext';

export default function ContactByPillar(){

  const {user} = useAuth();
  const [userContacts, setUserContacts] = useState<User[]>();
  useEffect(() => {
        getContacts();
    }, []);
  
  const getContacts = async () => {
    try {
        const contactsContainer : Contact[] = [];
        const q = query(contactCollection, where('ownerId', '==', user.id));
        const qSnapshot = await getDocs(q);
        qSnapshot.forEach((doc) => {
          console.log("contacts: ",doc.data())
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
                // <TouchableOpacity onPress={setcurrentPillar} activeOpacity={0.7}>
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
              // </TouchableOpacity>
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