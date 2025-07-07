import {View, Text, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import '@/global.css';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {ChatRoomHeader} from '@/components/ChatRoomHeader';
import { MessageList } from '@/components/MessageList';
import { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Message, User } from '@/types';
import { subscribeToMessages } from '@/utils/chatService';
import { useAuth } from '@/context/authContext';
import { collection, doc, getDocs, query, setDoc, Unsubscribe, updateDoc, where, serverTimestamp, Timestamp, UpdateData} from 'firebase/firestore';
import { userRef, db} from '@/firebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createThread } from '@/utils/chatService';
import CustomKeyboardView from '@/components/CustomKeyboardView';


export default function ChatRoom() {
    const {threadID: initialThreadID, contactID} = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]); 
    const [userMessage, setUserMessage] = useState<string>('');
    const [contact, setContact] = useState<User>();
    const {user} = useAuth();
    const [threadID, setThreadID] = useState<string | null>(initialThreadID as string || null);
    const [unsubscribeFromMessages, setUnsubscribeFromMessages] = useState<Unsubscribe | null>(null);


    useEffect(() => {
        // Only subscribe to messages if we have a threadID
        if (!threadID) {
            return;
        }

        const unsubscribe = subscribeToMessages(threadID, (messagesArray) => {
            setMessages(messagesArray);
        });

        // Store the unsubscribe function
        setUnsubscribeFromMessages(() => unsubscribe);

        // Cleanup function: unsubscribe when threadID changes or component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [threadID]); // Re-run when threadID changes

    useEffect(() => {
        // Fetch contact information when the component mounts
        getContact();
    }, [contactID]);

    useEffect(() => {
        // Cleanup unsubscribe function when component unmounts
        if (!threadID) {
            return;
        }
        return () => {
            if (unsubscribeFromMessages) {
                unsubscribeFromMessages();
                setUnsubscribeFromMessages(null);
            }
        };
    }, []);

    const getContact = async () => {
        if (!contactID) {
            console.warn("contactID is undefined, cannot fetch contact.");
            return;
        }
        try {
            const q = query(userRef, where('id', '==', contactID));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => setContact(doc.data() as User));
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    const createMessage = () => {
        if (!user || !contactID) {
            console.error("User or contactID is missing, cannot create message.");
            return null;
        }

        const message : Message = {
            fromId: user.id,
            toId: contactID as string,
            isEncrypted: false,
            messageText: userMessage!,
            status: {
                [contactID as string] : 0
            },
            timestamp: serverTimestamp() as Timestamp,
            id: "0"
        }
        setUserMessage('');
        return message;
    }

    const handleSendMessage = async () => {
        try {
            const message = createMessage();
            if (!message) return;

            let currentThreadID = threadID;

            // If no thread exists, create one first
            if (!currentThreadID) {
                console.log("No thread exists, creating new thread...");
                currentThreadID = await createThread(contact!, user);
                setThreadID(currentThreadID);
            }

            const threadDoc = doc(db, 'threads', currentThreadID!);
            const messageRef = doc(collection(threadDoc, 'messages'));

            message.id = messageRef.id;

            // Immediately change UI (optimistic update)
            setMessages((prevMessages) => [...prevMessages, message]);

            // Update Thread's last message
            await updateDoc(threadDoc, {
                lastMessage: message,
                lastUpdated: message.timestamp
            });

            if (messages.length === 0) {
                await updateDoc(threadDoc, {
                    firstMessageId: message.id
                });
            }           

            await setDoc(messageRef, message);

        } catch (err) {
            console.log("Error sending message:", err);
        }
    }
    
    return (
        <CustomKeyboardView>
            <View className='flex-1 bg-white'> 
                <StatusBar barStyle={'dark-content'}/>
                <ChatRoomHeader user={contact!} router={router} threadID={threadID || ''}/>
                <View className='h-3 border-b border-neutral-300'/>
                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className='flex-1'>
                        <MessageList messages={messages}/>
                    </View>
                    <View style={{marginBottom: hp(2.7)}} className="pt-2">
                        <View className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-5 p-2 mx-3'>
                            <TextInput 
                                placeholder='Type message...'
                                className='flex-1 mr-2' 
                                style={{fontSize: hp(2)}} 
                                onChangeText={(text) => {setUserMessage(text)}} 
                                value={userMessage}
                            />
                            <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <FontAwesome name="send" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}