import {View, Text, StatusBar} from 'react-native';
import '@/global.css';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {ChatRoomHeader} from '@/components/ChatRoomHeader';

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className='flex-1 bg-white'> 
            <StatusBar barStyle={'dark-content'}/>
            <ChatRoomHeader user={item} router={router}/>
            <View className='h-3 border-b border-neutral-300'/>
            <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                <View className='flex-1'>
                    <MessageList/>
                </View>

            </View>
        </View>
    )
}