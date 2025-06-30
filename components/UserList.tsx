import { View, FlatList, Text} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import UserItems from '@/components/UserItems'
import { Thread } from "@/types";
import { useRouter} from "expo-router";
import { subscribeToThreads } from "@/utils/chatService";

export const UserList = ({ pillarid }: { pillarid?: string | null }) => {
    const {user} = useAuth();
    const [threads, setThreads] = useState<Thread[]>([]);
    const router = useRouter();
    const pid = pillarid ?? null;

    useEffect(()=> {

        const unsubscribe = subscribeToThreads(user.id, (threadsArray) => {
            threadsArray.sort(sortThreads);
            setThreads(threadsArray);
        })

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user.id]);

    const sortThreads = (threadOne: Thread, threadTwo: Thread) => {
    
        const timeOne = threadOne.lastUpdated?.seconds ?? 0;
        const timeTwo = threadTwo.lastUpdated?.seconds ?? 0;
        
        if (timeOne < timeTwo) {
            console.log(`${timeOne} is less than ${timeTwo}`);
            return 1;
        }
        if (timeOne > timeTwo) {
            console.log(`${timeOne} is greater than ${timeTwo}`);
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