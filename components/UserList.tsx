import { View, FlatList, Text} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import UserItems from '@/components/UserItems'
import { Thread } from "@/types";
import { useRouter} from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import { threadsCollection } from "@/firebaseConfig";

export const UserList = ({ pillarid }: { pillarid?: string | null }) => {
    const {user} = useAuth();
    const [threads, setThreads] = useState<Thread[]>([]);
    const router = useRouter();
    const pid = pillarid ?? null;


    useEffect(()=>{
        if(user?.id){
            getThreads();

        }
    },[])


    // TODO: Thread last update isn't real time even though messages are. Maybe create a listener for the thread too? 
    const getThreads = async () => {
        const threadsRef : Thread[] = [];
        
        // Build query conditions
        const conditions = [where("uids", "array-contains", user?.id)];

        // Construct the query
        const q = query(threadsCollection, ...conditions);

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            const thread = doc.data() as Thread;
            // If pid is specified, filter manually based on pillarId array
            if (!pid || (thread.pillarId && thread.pillarId.includes(pid))) {
                threadsRef.push(thread);
            }
        })

        threadsRef.sort(sortThreads);
        setThreads(threadsRef);
    }

    const sortThreads = (threadOne: Thread, threadTwo: Thread) => {
        if(threadOne.lastUpdated.seconds < threadTwo.lastUpdated.seconds){

            console.log(`${threadOne.lastUpdated.seconds} is greater than ${threadTwo.lastUpdated.seconds}`);
            return 1;
        }
        if(threadOne.lastUpdated.seconds > threadTwo.lastUpdated.seconds){
            return -1;
        }
        return 0;
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
                        <Text style={{ color: 'gray' }}>No Messages found</Text>
                    </View>
                )
            }
        </View>
    )
}