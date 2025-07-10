import { User } from '@/types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View, Text, Image} from 'react-native';

export const ContactBanner = ({contact} : {contact: User}) => {
    //TODO: Box shadow seems to only show up when adding contact, not when viewing it in the contact page after adding them.
    return (
        <View className='flex-col gap-2 justify-center items-center bg-white p-3 m-3 shadow-xl' style={{borderRadius: 10}}>
            <Image source={{uri: contact.profileImageUrl}} 
                style={{width: 90, height: 90, borderRadius: 45}}
            />
            <Text className='font-bold' style={{fontSize: hp(2)}}>{contact?.firstName} {contact?.lastName}</Text>
            <Text className='font-thin text-neutral-500'>{contact?.email}</Text>
        </View>
    )
}