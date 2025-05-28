import {View, Text, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import '@/global.css';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {ChatRoomHeader} from '@/components/ChatRoomHeader';
import { MessageList } from '@/components/MessageList';
import { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Message } from '@/types';
import { fetchPreviousMessages } from '@/utils/chatService';
import { useAuth } from '@/context/authContext';
import { collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function ChatRoom() {
    // TODO: CHANGE LOCAL SEARCH PARAMS TO ALSO PASS CONCTACT ID SO MESSAGE CAN BE CREATED WITH FROM - TO IDS.
    const {threadID, contactName, contactID} = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]); 
    const [userMessage, setUserMessage] = useState<string>('');
    const {user} = useAuth();

    useEffect(() => {
        let messagesContainer: Message[] = [];
        fetchPreviousMessages(threadID as string).then(messageList => {
            messagesContainer = messageList;
            setMessages(messagesContainer);
        }).catch((err) => console.log(err));
    }, []);


    const createMessage = () => {
        const message : Message = {
            fromId: user.id,
            toId: contactID as string,
            isEncrypted: false, 
            messageText: userMessage!, 
            status: {
                [contactID as string] : 0
            },
            timestamp: Timestamp.fromDate(new Date()),
            id: "0"
        }
        setUserMessage('');
        return message; 
    }

    const handleSendMessage = async () => {
        
        try {
            const message = createMessage();
            const threadDoc = doc(db, 'threads' ,threadID as string);
            const messageRef = doc(collection(threadDoc, 'messages'));

            message.id = messageRef.id;
            
            // Update Thread's last message
            await updateDoc(threadDoc, {
                lastMessage: message, 
                lastUpdated: message.timestamp
            });
            

            // add message to messages collection.
            await setDoc(messageRef, message);


        } catch (err) {
            console.log(err);
        }
        
    }
    
    // TODO: FIX KEYBOARD SCROLLING ONCE CUSTOM COMPONENT IS CREATED

    return (
        <View className='flex-1 bg-white'> 
            <StatusBar barStyle={'dark-content'}/>
            <ChatRoomHeader user={contactName} router={router}/>
            <View className='h-3 border-b border-neutral-300'/>
            <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                <View className='flex-1'>
                    <MessageList messages={messages}/>
                </View>
                <View style={{marginBottom: hp(2.7)}} className="pt-2">
                    <View className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-5 p-2 mx-3'>
                        <TextInput placeholder='Type message...' className='flex-1 mr-2' style={{fontSize: hp(2)}} onChangeText={(text) => {setUserMessage(text)}} value={userMessage}/>
                        <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                            <Text>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}