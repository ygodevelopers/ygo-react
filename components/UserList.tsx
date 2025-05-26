import { ActivityIndicator, Text, View, FlatList} from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import { getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { contactCollection, threadsCollection, userRef} from '@/firebaseConfig'
import UserItems from '@/components/UserItems'
import { Contact, Thread, User } from "@/types";
import { fetchPreviousMessages } from "@/utils/chatService";

export const UserList = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(()=>{
        if(user?.id){
            getContacts();
            getThreads();
        }
    },[user?.id])


    const getContacts = async () =>{
        //fetch users
        const q = query(contactCollection, where('ownerId','==',user?.id));
        const querySnapshot = await getDocs(q);
        let contacts :Contact[] = [];
        
        querySnapshot.forEach(doc => {
            contacts.push({...doc.data() as Contact});
        })

        const contactsInfo: User[] = [];

        contacts.forEach( async (contact) => {
            const q = query(userRef, where('id', '==', contact.contactUserId));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(doc => {
                contactsInfo.push(doc.data() as User);
            })
        })
        setUsers(contactsInfo);
    }

    const getThreads = async () => {
        const threads : Thread[] = [];
        const q = query(threadsCollection, where("uids", "array-contains", user?.id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            threads.push(doc.data() as Thread);
        })

        threads.map(fetchPreviousMessages);
    }





    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <StatusBar style="light" />     
            {
                users.length > 0 ? (
                    <View className = "flex-1">
                        <FlatList
                            data = {users}
                            contentContainerStyle = {{flex:1, paddingVertical: 25}}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator = {false}
                            renderItem={({item, index})=><UserItems item={item}/>}
                            />

                    </View>
                ):(
                    <View className="flex item-center">
                        <ActivityIndicator size="large" />

                    </View>
                )
            }
        </View>
    )
}