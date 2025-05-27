import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Thread, User } from "@/types";
import { Router } from "expo-router";
import { useAuth } from "@/context/authContext";


export default function UserItems({item, router}: {item: Thread, router: Router}) {
    const [contact, setContact] = useState<User>();
    const {user} = useAuth();

    useEffect(() => {
        getUserInfo();
    },[item]);

    const openChatRoom = () => {
        const threadID = item.id; 
        router.push({pathname: '/(app)/chatRoom', params: {threadID: threadID, userName: contact?.firstName}});
    }



    const getUserInfo = () => {
        const {users} = item;
        users.forEach((otherUser) => {
            if(otherUser.id !== user?.id) {
                setContact(otherUser);
            }
        })
    }


    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-neutral-200`}>
            <Image 
                source={{ uri: contact?.profileImageUrl}}
                style={{height: hp(6), width: hp(6)}}
                className="rounded-full"
                />
            <View className="flex-1 gap-1">
                <View className="flex-1 flex-row justify-between">
                    <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">{contact?.firstName}</Text>
                    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Time</Text>
                </View>
                <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Last Message</Text>
            </View>
        </TouchableOpacity>
    );
}