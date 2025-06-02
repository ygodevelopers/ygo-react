import { ContactBanner } from "@/components/ContactBanner";
import { useAuth } from "@/context/authContext";
import { contactCollection, userRef } from "@/firebaseConfig";
import { User, Contact, Pillar } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ContactOption } from "@/components/ContactOption";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import { usePillar } from "@/context/pillarContext";


// TODO: Fix pillar context to add it to this page, should wrap the entire app like auth. Remove dummy emoji data to render correct pillar. 
// Add null pillar or simply don't unless they tap into it? Clear selected pillar if they close the select menu?

export default function ContactView() {
    const {contactID} = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    // const [contactPillars, setContactPillars] = useState<Contact>();
    const {user} = useAuth();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    // const {Pillars} = usePillar();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["40%"], []);
    const handlePresentPress = useCallback(() => {
        console.log("trying to open bottomsheet");
        bottomSheetRef.current?.expand();
    }, []);

    useEffect(() => {
        getContactInfo();
        // getContactPillars();
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

    // const getContactPillars = async () => {
    //     try {
    //         const q = query(contactCollection, where('contactUserId', '==', contactID), where('ownerId', '==', user.id));
    //         const qSnapshot = await getDocs(q);
    //         qSnapshot.forEach((doc) => setContactPillars(doc.data() as Contact));
    //     } catch (error) {
    //         console.error("Error fetching contact:", error);
    //     }
    // }

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

    const emojisWithIcons = [
        {title: 'happy', icon: 'emoticon-happy-outline'},
        {title: 'cool', icon: 'emoticon-cool-outline'},
        {title: 'lol', icon: 'emoticon-lol-outline'},
        {title: 'sad', icon: 'emoticon-sad-outline'},
        {title: 'cry', icon: 'emoticon-cry-outline'},
        {title: 'angry', icon: 'emoticon-angry-outline'},
        {title: 'confused', icon: 'emoticon-confused-outline'},
        {title: 'excited', icon: 'emoticon-excited-outline'},
        {title: 'kiss', icon: 'emoticon-kiss-outline'},
        {title: 'devil', icon: 'emoticon-devil-outline'},
        {title: 'dead', icon: 'emoticon-dead-outline'},
        {title: 'wink', icon: 'emoticon-wink-outline'},
        {title: 'sick', icon: 'emoticon-sick-outline'},
        {title: 'frown', icon: 'emoticon-frown-outline'},
    ];

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
                <BottomSheet 
                    ref={bottomSheetRef} 
                    index={-1} 
                    snapPoints={snapPoints} 
                    enablePanDownToClose={false} 
                    enableContentPanningGesture={false}
                    enableHandlePanningGesture={false}
                    handleComponent={null}
                    backdropComponent={renderBackdrop}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <Text style={styles.bottomSheetTitle}>Select Pillar</Text>
                        <SelectDropdown
                            data={emojisWithIcons}
                            onSelect={(selectedItem, index) => {
                                setSelectedPillar(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Change Pillar'}
                                        </Text>
                                        <FontAwesome 
                                            name={isOpened ? 'chevron-up' : 'chevron-down'} 
                                            size={16} 
                                            color="#151E26"
                                        />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{
                                        ...styles.dropdownItemStyle, 
                                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                                        borderBottomWidth: index < emojisWithIcons.length - 1 ? 1 : 0,
                                        borderBottomColor: '#C0C0C0'
                                    }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                            dropdownOverlayColor="transparent"
                        />
                    </BottomSheetView>
                </BottomSheet>  
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    bottomSheetTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#151E26',
        marginBottom: 20,
    },
    dropdownButtonStyle: {
        width: 250,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    dropdownButtonTxtStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
        flex: 1,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        marginTop: 4,
        width: 250,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 12,
        minHeight: 44,
    },
    dropdownItemTxtStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'left',
    },
});