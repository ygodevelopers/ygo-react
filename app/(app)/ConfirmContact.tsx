import { ContactBanner } from '@/components/ContactBanner';
import { SelectPillarDropDown } from '@/components/SelectPillarDropDown';
import { useAuth } from '@/context/authContext';
import { userRef, contactCollection } from '@/firebaseConfig';
import { Contact, Pillar, User } from '@/types';
import { createThread } from '@/utils/chatService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDocs, query, serverTimestamp, getDoc,setDoc, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View} from 'react-native';
import { v4 } from "uuid";

export default function ConfirmContact() {
    const {user} = useAuth();
    const {contactID} = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    const router = useRouter();

    useEffect( () => {  
        getContact();
    }, [contactID]);

    const getContact = async () => {
        try {
            const q = query(userRef, where('id', '==', contactID));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => setContact(doc.data() as User));
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    const handleSelectedPillar = (item: Pillar) => {
        setSelectedPillar(item);
    }

    const checkContact = async (): Promise<boolean> => {
        try {
            const q = query(contactCollection, where('ownerId', '==', user.id), where('contactUserId', '==', contact?.id));
            const qSnapshot = await getDocs(q);
            if (qSnapshot.empty) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const handleSaveContact = async () => {
        saveContact();
        // checkContact().then((valid) => {
        //     if(valid){
        //         saveContact();
        //     }
        //     else{
        //         alert('Cant add same contact!');
        //     }
        // })
    }

    const saveContact = async () => {
        if(contact?.id == user.id) {
            alert("cannot add yourself as a contact");
            return;
        }

        if(contact) {
            const contactRef = doc(contactCollection);

            const contactDoc : Contact = {
                contactUserId: contact.id,
                ownerId: user.id,
                pillarId: [selectedPillar ? selectedPillar.id : ""],
                id: v4().toUpperCase()
            };

            setDoc(contactRef, contactDoc);

            try {
                router.replace({pathname: '/(app)/chatRoom', params: {contactID: contact.id}});
            } catch (error) {
                console.error('Error creating contact:', error);
            }
        }
    }

    return (
        <View className='flex-col gap-3'>
            {contact && <ContactBanner contact={contact} />}
            <View className='flex-col justify-center items-center gap-3'>
                <SelectPillarDropDown handleSelectPillar={handleSelectedPillar} showIcons={true}/>
                <TouchableOpacity 
                    className='bg-blue-500 p-3 mt-2'
                    style={{borderRadius: 10}}
                    onPress={handleSaveContact}
                >
                    <Text className='text-white font-semibold text-center'>SAVE CONTACT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}