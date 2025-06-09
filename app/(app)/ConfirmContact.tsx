import { ContactBanner } from '@/components/ContactBanner';
import { SelectPillarDropDown } from '@/components/SelectPillarDropDown';
import { useAuth } from '@/context/authContext';
import { threadsCollection, userRef, contactCollection } from '@/firebaseConfig';
import { Contact, Pillar, Thread, User } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, getDocs, query, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {Button, View} from 'react-native';

export default function ConfirmContact() {
    const {user} = useAuth();
    const [contact, setContact] = useState<User>();
    const {email} = useLocalSearchParams();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    const router = useRouter();

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

    const handleSelectedPillar = (item: Pillar) => {
        setSelectedPillar(item);
    }


    // TODO: Should I check to see if the contact has already been added?
    // Create thread with contact? Why is the contact id handled differently?
    const handleSaveContact = async () => {
        if(contact?.id == user.id) {
            alert("cannot add yourself as a contact");
            return;
        }

        if(contact) {
            
            const contactDoc : Contact = {
                contactUserId: contact.id,
                ownerId: user.id,
                pillarId: [selectedPillar ? selectedPillar.id : ""],
            };

            try {
                const docRef = await addDoc(contactCollection, contactDoc);
                console.log('Contact created with ID:', docRef.id);
                createThread();

            } catch (error) {
                console.error('Error creating contact:', error);
            }
        }
    }

    const createThread = async () => {
        const thread : Omit<Thread, "id"|"firstMessageId"|"lastMessage"> = {
            lastUpdated: serverTimestamp() as Timestamp,
            uids: [user.id, contact!.id],
            users: [user, contact]
        };
        console.log(user);
        console.log(contact);
        console.log(thread);
        try {
            const threadRef = await addDoc(threadsCollection, thread);
            console.log('Thread created with ID:', threadRef.id);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    }

    return (
        <View>
            {contact && <ContactBanner contact={contact} />}
            <SelectPillarDropDown handleSelectPillar={handleSelectedPillar} showIcons={true}/>
            <Button title='Save Contact' onPress={handleSaveContact}/>
        </View>
    )
}