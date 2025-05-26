import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from "expo-image";


export default function UserItems(item: any) {
    
    // TODO: COMPONENT PARAMETER IS A USER BUT SHOULD PROBABLY FIX TO BE A THREAD. Only way to get last message and time. 

    return (
        <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-neutral-200`}>
            <Image 
                source={{ uri: item?.item?.profileImageUrl}}
                style={{height: hp(6), width: hp(6)}}
                className="rounded-full"
                />
            <View className="flex-1 gap-1">
                <View className="flex-1 flex-row justify-between">
                    <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">{item?.item.firstName}</Text>
                    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Time</Text>
                </View>
                <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Last Message</Text>
            </View>
        </TouchableOpacity>
    );
}