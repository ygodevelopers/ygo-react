import { ActivityIndicator, Text, View, FlatList} from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import { getDocs, query, where } from 'firebase/firestore'
import { userRef } from '@/firebaseConfig'
import UserItems from '@/components/UserItems'

export const UserList = () => {
    const {user} = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(()=>{
        console.log("UserList currentuser: ", user)
        console.log("UserList currentuser ID : ", user?.id)
        if(user?.id){
            getUsers();
        }
    },[])

    interface User {
        id: string;
        email: string;
        firstName: string;
        profileImageUel: string;
        // Add other fields as needed
      }

    const getUsers = async()=>{
        //fetch users
        const q = query(userRef, where('id','!=',user?.id));
        const querySnapshot = await getDocs(q);
        let data:User[] = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data() as User});
        })
        console.log("fetch users: ", data);
        setUsers(data);
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
            <Text>User List</Text>
      
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