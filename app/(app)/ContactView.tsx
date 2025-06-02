import { ContactBanner } from "@/components/ContactBanner";
import { useAuth } from "@/context/authContext";
import { contactCollection, userRef } from "@/firebaseConfig";
import { User, Contact } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ContactOption } from "@/components/ContactOption";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet';



export default function ContactView() {
    const {contactID} = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    const [contactPillars, setContactPillars] = useState<Contact>();
    const {user} = useAuth();


    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["40%"], []);
    const handlePresentPress = useCallback(() => {
        console.log("trying to open bottomsheet");
        bottomSheetRef.current?.expand();
    }, []);

    useEffect(() => {
        getContactInfo();
        getContactPillars();
    }, [contactID])

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
        try {
            const q = query(contactCollection, where('contactUserId', '==', contactID), where('ownerId', '==', user.id));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => setContactPillars(doc.data() as Contact));
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    const renderBackdrop = useCallback(
    (props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            onPress={() => bottomSheetRef.current?.close()}
        />
    ),
    []
);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="flex-1 flex-col gap-3">
                <ContactBanner contact={contact as User}/>
                <View className="flex-1 flex-col">
                    <ContactOption symbol={<FontAwesome name="refresh" size={24} color="black" />} text="Change Pillar" handlePress={handlePresentPress}/>
                    <ContactOption symbol={<FontAwesome6 name="people-group" size={24} color="black" />} text="People" handlePress={() => {console.log("pressed People")}}/>
                    <ContactOption symbol={<FontAwesome5 name="lock" size={24} color="black" />} text="Privacy and Security" handlePress={() => {console.log("pressed Priv")}}/>
                    <ContactOption symbol={<FontAwesome6 name="paperclip" size={24} color="black" />} text="Attachments" handlePress={() => {console.log("pressed Attachments")}}/>
                </View>
                <BottomSheet ref={bottomSheetRef} 
                        index={-1} 
                        snapPoints={snapPoints} 
                        enablePanDownToClose={false} 
                        enableContentPanningGesture={false}
                        enableHandlePanningGesture={false}
                        handleComponent={null}
                        backdropComponent={renderBackdrop}
                        >
                            <BottomSheetView className="flex-1 items-center">
                                <Text>Change Pillar Popup</Text>
                            </BottomSheetView>
                    </BottomSheet>  
            </View>
        </GestureHandlerRootView>
    )
}