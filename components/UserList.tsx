import { ActivityIndicator, View, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import { getDocs, query, where } from 'firebase/firestore'
import { threadsCollection} from '@/firebaseConfig'
import UserItems from '@/components/UserItems'
import { Thread } from "@/types";
import { useRouter } from "expo-router";

export const UserList = () => {
    const {user} = useAuth();
    const [threads, setThreads] = useState<Thread[]>([]);
    const router = useRouter();

    useEffect(()=>{
        if(user?.id){
            getThreads();
        }
    },[])


    // TODO: Thread last update isn't real time even though messages are. Maybe create a listener for the thread too? 
    const getThreads = async () => {
        const threadsRef : Thread[] = [];
        

        const q = query(threadsCollection, where("uids", "array-contains", user?.id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            threadsRef.push(doc.data() as Thread);
        })
        setThreads(threadsRef);
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
                threads.length > 0 ? (
                    <View className="flex-1">
                        <FlatList
                            data = {threads}
                            contentContainerStyle = {{flex:1, paddingVertical: 25}}
                            keyExtractor={(item: Thread, index) => index.toString()}
                            showsVerticalScrollIndicator = {false}
                            renderItem={({item, index})=><UserItems item={item} router={router}/>}
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