import { ContactBanner } from "@/components/ContactBanner";
import { useAuth } from "@/context/authContext";
import { contactCollection, userRef } from "@/firebaseConfig";
import { User, Contact } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { View, Text } from "react-native";


// TODO: Look into Tanstack Query for state management. Dont really want to pass the threadID or the contactID between pages and then query them for each time i need it. Violates dry.
// The information also won't change as you cannot change a contacts information, they set it themselves. Would rather store user information in local storage somehow and then delete it once user changes? Or is it better to pull it each time?

// Still reading about Tanstack query but want to get this working before hyper-fixating. 
export default function ContactView() {
    const {contactID} = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    const [contactPillars, setContactPillars] = useState<Contact>();
    const {user} = useAuth();

    const getContactInfo = async () => {
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

    const getContactPillars = async () => {
        if (!contactID) {
            console.warn("contactID is undefined, cannot fetch contact.");
            return;
        }
        try {
            const q = query(contactCollection, where('contactUserId', '==', contactID), where('ownerId', '==', user.id));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => setContactPillars(doc.data() as Contact));
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    return (
        <View className="flex-1 flex-col gap-3">
            <ContactBanner contact={contact as User}/>
            <View className="flex-1 flex-col">
            </View>
        </View>
    )
}