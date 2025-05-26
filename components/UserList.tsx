import { ActivityIndicator, Text, View, FlatList} from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import { getDocs, query, where } from 'firebase/firestore'
import { threadsCollection} from '@/firebaseConfig'
import UserItems from '@/components/UserItems'
import { Thread, User } from "@/types";
import { fetchPreviousMessages } from "@/utils/chatService";

export const UserList = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(()=>{
        if(user?.id){
            getThreads();
        }
    },[user?.id])

    const getThreads = async () => {
        const threads : Thread[] = [];
        const users: User[][] = [];

        const q = query(threadsCollection, where("uids", "array-contains", user?.id));
        const querySnapshot = await getDocs(q);


        querySnapshot.forEach(doc => {
            threads.push(doc.data() as Thread);
        })

        threads.forEach((thread) => {
            let others: User[]= [];

            thread.users.forEach((otherUser) => {

                if(otherUser.id !== user?.id) {
                    others.push(otherUser);
                }

            })
            users.push(others);
        })

        // TODO: FIX COMPONENT TO TAKE AN 2D ARRAY OF USERS. NEEDED FOR GROUP CHATS
        setUsers(users[0])

        // TODO: ACTUALLY DO SOMETHING WITH MESSAGES. JUST WANTED TO PROVE IT WORKS.
        const messages = threads.map(fetchPreviousMessages);
        
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