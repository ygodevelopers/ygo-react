import { Text, TouchableOpacity, View, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import { Pillar, Thread, User } from "@/types";
import { Router } from "expo-router";
import { useAuth } from "@/context/authContext";
import { usePillar } from "@/context/pillarContext";


export default function UserItems({ item, router }: { item: Thread, router: Router }) {
    const [contact, setContact] = useState<User>();
    const [pillar, setPillar] = useState<Pillar>();
    const { Pillars } = usePillar();
    const { user } = useAuth();

    if (!user) return null;

    useEffect(() => {
        getUserInfo();
        getPillarInfo();
    }, [item]);

    const openChatRoom = () => {
        const threadID = item.id;
        router.push({ pathname: '/(app)/chatRoom', params: { threadID: threadID, contactName: contact?.firstName, contactID: contact?.id } });
    }

    const getUserInfo = () => {
        const { users } = item;
        users.forEach((otherUser) => {
            if (otherUser.id !== user?.id) {
                setContact(otherUser);
            }
        })
    }

    const getPillarInfo = () => {
        Pillars.forEach((element: Pillar) => {
            item.pillarId?.forEach(threadPillar => {
                if (element.id == threadPillar) {
                    setPillar(element);
                }
            })
        });
    }

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-neutral-200`}>
            <View style={{ position: "relative" }}>
                <Image
                    source={contact?.profileImageUrl ? { uri: contact.profileImageUrl } : undefined}
                    style={{ borderRadius: 100, height: hp(4.5), aspectRatio: 1 }}
                />
                {contact?.activeStatus !== undefined && (
                    <View
                        style={{
                            position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: contact.activeStatus ? "green" : "gray",
                            borderWidth: 1.5, borderColor: "white",
                        }}
                    />
                )}
            </View>


            <View className="flex-1 gap-1">
                <View className="flex-1 flex-row justify-between">
                    <Text style={{ fontSize: hp(1.8), marginRight: 40 }} className="font-semibold text-neutral-500">{contact?.firstName}</Text>
                    <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">{item.lastUpdated?.toDate ? item.lastUpdated.toDate().toLocaleDateString() : ""}
                    </Text>
                </View>
                {
                    pillar &&
                    <Text style={{ color: pillar.color }}>{pillar.title}</Text>
                }
                <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">
                    {item.lastMessage?.messageText && item.lastMessage.messageText.length <= 10
                        ? item.lastMessage.messageText
                        : item.lastMessage?.messageText
                            ? item.lastMessage.messageText.slice(0, 7) + "..."
                            : ""}
                </Text>
            </View>
        </TouchableOpacity>
    );
}