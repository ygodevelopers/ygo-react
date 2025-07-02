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

export default function PillarContact() {
  const router = useRouter();
  const {user} = useAuth();
  const [userContacts, setUserContacts] = useState<User[]>();

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
        {/* <TouchableOpacity onPress={() => setModalContact(false)}>
          <Text style={{
            fontSize: hp(1.8),
            letterSpacing: 1,
            textAlign: 'center',
          }}>Cancel</Text>
        </TouchableOpacity> */}
        <Text style={{
          fontSize: hp(3),
          letterSpacing: 1,
          textAlign: 'center',
        }}>Actions</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <View style={{flex: 1, width: '100%', alignItems: 'center' }}>
        {/* <Text style={[styles.title]}>Actions</Text> */}

        <View style={styles.container} >
          <Text style={styles.icon}>🎎</Text>
          <Text style={styles.title}>New Group Chat</Text>
        </View>
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
                        borderWidth: 1,
                        borderColor: '#aaa',
                        borderRadius: 12,
                        gap: 8,}} >

                            <Image source={item?.profileImageUrl ? { uri: item.profileImageUrl } : undefined} style={{borderRadius: 100, height: hp(4.5), aspectRatio: 1}}/>

                            <Text>{item?.firstName} {item?.lastName}</Text>
                    </View>
                // </TouchableOpacity>
                )}
              />
            // <AlphabetList
            //     data={userContacts.map((contact) => ({
            //         key: contact.id!,
            //         value: contact.firstName, // or contact.email, depending on what you want to display
            //         ...contact
            //     }))}
            //     indexLetterStyle={{ 
            //         color: 'blue', 
            //         fontSize: 15,
            //     }}
            //     renderCustomItem={(item) => (
            //         <TouchableOpacity onPress={() => {sendToChatRoom(item)}}>
            //             <View>
            //                 <Text>{item.value} {item.lastName}</Text>
            //             </View>
            //         </TouchableOpacity>
                    
            //     )}
            // />
        }
        </View>
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