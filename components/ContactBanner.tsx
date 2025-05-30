import { User } from '@/types';
import { Image } from 'expo-image';
import {View, Text} from 'react-native';

export const ContactBanner = ({contact} : {contact: User}) => {
    return (
        <View className='flex-1 flex-col gap-2 justify-center items-center'>
            <Image source={contact?.profileImageUrl}/>
            <Text>{contact?.firstName} {contact?.lastName}</Text>
            <Text>{contact?.email}</Text>
        </View>
    )
}