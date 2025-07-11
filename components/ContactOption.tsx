import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import type { GestureResponderEvent } from 'react-native';

export const ContactOption = ({symbol, text, handlePress} : {symbol: typeof FontAwesome6, text: string, handlePress: (event: GestureResponderEvent) => void}) => {
    return (
        <TouchableOpacity 
            onPress={handlePress}
            activeOpacity={0.7}
            className="w-full"
        >
            <View className='flex-row justify-start items-center gap-4 py-2 px-1'>
                <View className="w-6 items-center">
                    {symbol}
                </View>
                <Text className='text-base text-gray-800 flex-1'>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}