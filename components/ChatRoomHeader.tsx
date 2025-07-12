import { View, Text, TouchableOpacity } from "react-native";
import '@/global.css';
import { Stack } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Router } from "expo-router";
import { Image } from "expo-image";
import { User } from "@/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


export const ChatRoomHeader = ({ user, router, threadID }: { user: User, router: Router, threadID: string }) => {
    return (
        <Stack.Screen options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () => (
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push({ params: { contactID: user.id, threadID: threadID }, pathname: '/(app)/ContactView' })}>
                        <View className="flex-row items-center gap-3">
                            <View style={{ position: "relative" }}>
                                <Image source={user?.profileImageUrl} style={{ borderRadius: 100, height: hp(4.5), aspectRatio: 1 }} />
                                <View style={{
                                    position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, borderWidth: 1.5, borderColor: 'white',
                                    backgroundColor: user?.activeStatus ? 'green' : 'gray',
                                }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-medium">
                                    {user?.firstName} {user?.lastName}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View className="flex-row items-center gap-8 p-3">
                    <FontAwesome name="video-camera" size={24} color="black" />
                    <FontAwesome name="phone" size={24} color="black" />
                </View>
            ),
        }}>

        </Stack.Screen>
    )
}