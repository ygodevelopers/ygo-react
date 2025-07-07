import { ContactBanner } from "@/components/ContactBanner";
import { useAuth } from "@/context/authContext";
import { userRef } from "@/firebaseConfig";
import { User, Pillar, Thread } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { getDocs, query, where, updateDoc, doc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ContactOption } from "@/components/ContactOption";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import { usePillar } from "@/context/pillarContext";
import { db } from "@/firebaseConfig";
import { SelectPillarDropDown } from "@/components/SelectPillarDropDown";
import PrivacyAndSecurityModal from "@/components/PrivacyAndSecurityModal";

// TODO: Separate out select menu, prop should be array of pillars.
// Add null pillar or simply don't unless they tap into it? Clear selected pillar if they close the select menu?

export default function ContactView() {
    const { contactID, threadID } = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    const { user } = useAuth();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    const { Pillars } = usePillar();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["40%"], []);

    const handlePresentPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);


    useEffect(() => {
        getContactInfo();
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

    const handleNotFinishedPress = () => {
        alert("Not implemented yet sorry!");
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


    const handlePillarChange = async (pillarID: String) => {
        const threadRef = doc(db, "threads", threadID as string);
        const threadSnapshot = await getDoc(threadRef);

        const thread: Thread = threadSnapshot.data() as Thread;


        Pillars.forEach((pillar: Pillar) => {
            thread.pillarId?.forEach(async (threadPillar: string) => {
                if (pillar.id == threadPillar) {
                    await updateDoc(threadRef,
                        {
                            pillarId: arrayRemove(threadPillar)
                        }
                    )
                }
            })
        })

        await updateDoc(threadRef,
            {
                pillarId: arrayUnion(pillarID)
            }
        )

        bottomSheetRef.current?.close();
    }

    const handleSelectPillar = (item: Pillar) => {
        setSelectedPillar(item);
    }


    return (


        <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="flex-1 flex-col gap-3">
                <ContactBanner contact={contact as User} />
                <View className="flex-1 flex-col">
                    <ContactOption symbol={<FontAwesome name="refresh" size={24} color="black" />} text="Change Pillar" handlePress={handlePresentPress} />
                    <ContactOption symbol={<FontAwesome6 name="people-group" size={24} color="black" />} text="People" handlePress={handleNotFinishedPress} />
                    {/*<ContactOption symbol={<FontAwesome5 name="lock" size={24} color="black" />} text="Privacy and Security" handlePress={handleNotFinishedPress} />*/}

                    <ContactOption
                        symbol={<FontAwesome5 name="lock" size={24} color="black" />}
                        text="Privacy and Security"
                        handlePress={() => setShowPrivacyModal(true)}
                    />

                    <ContactOption symbol={<FontAwesome6 name="paperclip" size={24} color="black" />} text="Attachments" handlePress={handleNotFinishedPress} />
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
                        <SelectPillarDropDown showIcons={false} handleSelectPillar={handleSelectPillar} />
                        <Text>Selected Pillar: {selectedPillar?.icon} {selectedPillar?.title}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedPillar) {
                                    handlePillarChange(selectedPillar.id);
                                } else {
                                    alert("Please select a pillar first.");
                                }
                            }}
                            className="flex-1"
                        >
                            <View className=" flex-row justify-between items-center">
                                <Text>Change Pillar</Text>
                                <FontAwesome name="refresh" size={24} color="blue" />
                            </View>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </View>



            {showPrivacyModal && (
                <View style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <PrivacyAndSecurityModal contact={contact} onClose={() => setShowPrivacyModal(false)} />
                </View>
            )}


        </GestureHandlerRootView>
    )
}

// Copied styles from documentation
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