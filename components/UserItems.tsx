import { Text, TouchableOpacity, View, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import { Pillar, Thread, User } from "@/types";
import { Router } from "expo-router";
import { useAuth } from "@/context/authContext";
import { usePillar } from "@/context/pillarContext";
import { userRef } from "@/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function UserItems({ item, router }: { item: Thread, router: Router }) {

    const { Pillars, setCurrentThread } = usePillar();
    const { user } = useAuth();
    const [contact, setContact] = useState<User>();
    const [pillar, setPillar] = useState<Pillar>();


    useEffect(() => {
        getUserInfo();
        getPillarInfo();
        setCurrentThread(item);
    }, [item]);

    if (!user) return null;
    const openChatRoom = () => {
        const threadID = item.id;
        router.push({ pathname: '/(app)/chatRoom', params: { threadID: threadID, contactName: contact?.firstName, contactID: contact?.id } });
    }

    const getUserInfo = async () => {
        const { uids } = item;
        const otherUserId = uids.find((uid) => uid !== user?.id);
        if (!otherUserId) return;

        try {
            const userDoc = await getDoc(doc(userRef, otherUserId));
            if (userDoc.exists()) {
                setContact(userDoc.data() as User);
            }
        } catch (error) {
            console.error("Failed to fetch contact info:", error);
        }
    };

    const getPillarInfo = () => {
        Pillars.forEach((element: Pillar) => {
            item.pillarId?.forEach(threadPillar => {
                if (element.id == threadPillar) {
                    setPillar(element);
                }
            })
        });
    }

    // Format time like iOS Messages, make it state based to update when minute changes? 
    const formatTime = () => {
        if (!item.lastUpdated) return "";

        const messageDate = item.lastUpdated.toDate();
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h`;
        } else if (diffInDays < 7) {
            return `${diffInDays}d`;
        } else {
            return messageDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    }

    return (
        <TouchableOpacity onPress={openChatRoom} className={"flex-row items-center px-4 py-3 bg-white active:bg-gray-50"}>
            <View className="mr-4 items-center justify-center" style={{
                width: 56,
                height: 56,
                borderRadius: 26,
                borderWidth: 2,
                borderColor: pillar?.color || "#d1d5db",
            }}>
                {contact?.profileImageUrl ? (
                    <Image
                        source={{ uri: contact.profileImageUrl }} className="w-12 h-12 rounded-full" style={{ width: 52, height: 52 }}
                    />
                ) : (
                    <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
                        <Text className="text-white font-semibold text-lg">
                            {`${contact?.firstName?.charAt(0) || ""}${contact?.lastName?.charAt(0) || ""}`.toUpperCase() || "?"}
                        </Text>
                    </View>
                )}

            </View>

            <View className="flex-1 border-b border-gray-200 pb-3">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-black font-semibold text-lg"> {contact?.firstName || "Unknown"} </Text>
                    {/* <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">{item.lastUpdated?.toDate ? item.lastUpdated.toDate().toLocaleDateString() : ""}
                    </Text> */}
                    <Text className="text-gray-500 text-sm"> {formatTime()}</Text>
                </View>
                {
                    pillar && (
                        <Text className="text-sm font-medium mb-1" style={{ color: pillar.color }}>{pillar.title}</Text>
                    )}
                <Text className="text-gray-500 text-base" numberOfLines={1}>
                    {item.lastMessage?.messageText
                        ? item.lastMessage.messageText.length <= 10
                            ? item.lastMessage.messageText
                            : `${item.lastMessage.messageText.slice(0, 7)}...`
                        : ""
                    }
                </Text>
            </View >
        </TouchableOpacity >
    );
}