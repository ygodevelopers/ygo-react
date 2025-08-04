import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import UserItems from '@/components/UserItems'
import { Thread } from "@/types";
import { useRouter } from "expo-router";
import { subscribeToThreads } from "@/utils/chatService";
import { onSnapshot, query, where } from "firebase/firestore";
import { threadsCollection, userRef } from "@/firebaseConfig";
import { doc } from "firebase/firestore";

export const UserList = ({ pillarid }: { pillarid?: string | null }) => {
    const { user } = useAuth();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
    const router = useRouter();
    const pid = pillarid ?? null;
    

    useEffect(() => {
        if (!user?.id) return;
        const unsubscribe = subscribeToThreads(user.id, (threadsArray) => {
            const filteredThreads = threadsArray.filter(thread => {
                const otherUserId = thread.uids.find((uid: string) => uid !== user.id);
                const isUserAllowed = !blockedUserIds.includes(otherUserId || "");
       
                const isPillarMatched = pid ? thread.pillarId?.includes(pid) : true;
                console.log("thread.pillarId: ", thread.pillarId, "pid: ", pid ,"isUserAllowed:",isUserAllowed, "isPillarMatched: ", isPillarMatched);
                return isUserAllowed && isPillarMatched;
            });
            filteredThreads.sort(sortThreads);
            setThreads(filteredThreads);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user?.id, blockedUserIds]);


    useEffect(() => {
        if (!user?.id) return;

        const unsubscribe = onSnapshot(doc(userRef, user.id), (docSnapshot) => {
            const data = docSnapshot.data();
            setBlockedUserIds([...(data?.blockedUsers || [])]);
        });

        return () => unsubscribe();
    }, [user?.id]);

    const sortThreads = (threadOne: Thread, threadTwo: Thread) => {

        const timeOne = threadOne.lastUpdated?.seconds ?? 0;
        const timeTwo = threadTwo.lastUpdated?.seconds ?? 0;

        if (timeOne < timeTwo) {
            return 1;
        }
        if (timeOne > timeTwo) {
            return -1;
        }
        return 0;
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            {
                threads.length > 0 ? (
                    <View className="flex-1">
                        <FlatList
                            data={threads}
                            contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                            keyExtractor={(item: Thread, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => item.lastUpdated ? (<UserItems item={item} router={router} />) : null}
                            className="flex-1"
                        />
                    </View>
                ) : (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-gray-500 text-lg">No Messages found</Text>
                    </View>
                )
            }
        </View>
    )
}