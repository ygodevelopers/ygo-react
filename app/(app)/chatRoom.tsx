import {View, Text, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import '@/global.css';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {ChatRoomHeader} from '@/components/ChatRoomHeader';
import { MessageList } from '@/components/MessageList';
import { useEffect, useRef, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Message } from '@/types';
import { fetchPreviousMessages } from '@/utils/chatService';

export default function ChatRoom() {
    const {threadID, userName} = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]); 

    useEffect(() => {
        let messagesContainer: Message[] = [];
        fetchPreviousMessages(threadID as string).then(messageList => {
            messagesContainer = messageList;
            setMessages(messagesContainer);
        }).catch((err) => console.log(err));
    }, []);

    const textRef = useRef('');

    const handleSendMessage = () => {

    }
    
    // TODO: FIX KEYBOARD SCROLLING ONCE CUSTOM COMPONENT IS CREATED

    return (
        <View className='flex-1 bg-white'> 
            <StatusBar barStyle={'dark-content'}/>
            <ChatRoomHeader user={userName} router={router}/>
            <View className='h-3 border-b border-neutral-300'/>
            <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                <View className='flex-1'>
                    <MessageList messages={messages}/>
                </View>
                <View style={{marginBottom: hp(2.7)}} className="pt-2">
                    <View className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-5 p-2 mx-3'>
                        <TextInput placeholder='Type message...' className='flex-1 mr-2' style={{fontSize: hp(2)}}/>
                        <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                            <Text>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}