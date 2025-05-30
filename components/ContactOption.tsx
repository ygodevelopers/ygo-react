import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import type { GestureResponderEvent } from 'react-native';

export const ContactOption = ({symbol, text, handlePress} : {symbol: typeof FontAwesome6, text: string, handlePress: (event: GestureResponderEvent) => void}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className='flex-row gap-3 justify-center items-center'>
                {symbol}
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
        
    )
}