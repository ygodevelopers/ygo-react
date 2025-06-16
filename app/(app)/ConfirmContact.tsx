import { ContactBanner } from '@/components/ContactBanner';
import { SelectPillarDropDown } from '@/components/SelectPillarDropDown';
import { useAuth } from '@/context/authContext';
import { threadsCollection, userRef, contactCollection } from '@/firebaseConfig';
import { Contact, Pillar, Thread, User } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDocs, query, serverTimestamp, setDoc, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, View} from 'react-native';
import { v4 } from "uuid";

export default function ConfirmContact() {
    const {user} = useAuth();
    const [contact, setContact] = useState<User>();
    const {email} = useLocalSearchParams();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    const router = useRouter();

    useEffect( () => {  
        getContact();
        console.log(user);
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
    // Should messages collection be created as just left empty? or wait until first message to create?
    const handleSaveContact = async () => {
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

            try {
                const docRef = await setDoc(contactRef, contactDoc);
                createThread();
                router.replace('/(app)/(tabs)/chats');

            } catch (error) {
                console.error('Error creating contact:', error);
            }
        }
    }


    //TODO: Take this out and put it into util be able to call it from contactView.

    const createThread = async () => {
        const threadRef = doc(threadsCollection); 

        const thread : Omit<Thread, "firstMessageId"|"lastMessage"> = {
            lastUpdated: serverTimestamp() as Timestamp,
            uids: [user.id, contact!.id],
            users: [user, contact],
            creatorId: user.id,
            id: threadRef.id 
        };

        try {
            await setDoc(threadRef, thread);
            console.log("Thread created with ID: ", threadRef.id);
        } catch (error) {
            console.error('Error creating thread:', error);
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