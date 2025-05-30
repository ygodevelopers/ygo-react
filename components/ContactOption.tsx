import {View, Text} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export const ContactOption = ({symbol, text} : {symbol: typeof FontAwesome6, text: string}) => {
    return (
        <View className='flex-1 flex-row gap-3 justify-center items-center'>
            {symbol}
            <Text>{text}</Text>
        </View>
    )
}