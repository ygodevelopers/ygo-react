import { View, Text, TouchableOpacity } from "react-native";
import '@/global.css';
import { Stack } from "expo-router";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Router } from "expo-router";
import { Image } from "expo-image";
import { User } from "@/types";


export const ChatRoomHeader = ({user, router} : {user: User, router: Router}) => {
    return (
        <Stack.Screen options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () => (
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{fontSize: hp(4), color: '#737373'}}>Back</Text>
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3">
                        <Image source={user?.profileImageUrl} style={{borderRadius: 100, height: hp(4.5), aspectRatio: 1}}/>
                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                            {user?.firstName}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <View className="flex-row items-center gap-8">
                    <Text>Call</Text>
                    <Text>Video</Text>
                </View>
            ), 
        }}>

        </Stack.Screen>
    )
}