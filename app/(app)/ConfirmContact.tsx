import { ContactBanner } from '@/components/ContactBanner';
import { userRef } from '@/firebaseConfig';
import { User } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';

export default function ConfirmContact() {
    const [contact, setContact] = useState<User>();
    const {email} = useLocalSearchParams();

    useEffect( () => {  
        getContact();
    }, [email]);

    const getContact = async () => {
        try {
            const q = query(userRef, where('email', '==', email));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => setContact(doc.data() as User));
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    return (
        <View>
            {contact && <ContactBanner contact={contact} />}
            
        </View>
    )
}