import { ContactBanner } from '@/components/ContactBanner';
import { SelectPillarDropDown } from '@/components/SelectPillarDropDown';
import { useAuth } from '@/context/authContext';
import { userRef, contactCollection } from '@/firebaseConfig';
import { Contact, Pillar, User } from '@/types';
import { createThread } from '@/utils/chatService';
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


    // TODO: Should I check to see if the contact has already been added?
    // Create thread with contact? Why is the contact id handled differently?
    // Should messages collection be created as just left empty? or wait until first message to create?
    const handleSaveContact = async () => {
        checkContact().then((valid) => {
            if(valid){
                saveContact();
            }
            else{
                alert('Cant add same contact!');
            }
        })
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

            try {
                router.replace({pathname: '/(app)/chatRoom', params: {contactID: contact.id}});

            } catch (error) {
                console.error('Error creating contact:', error);
            }
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