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
import { useRouter } from "expo-router";

// TODO: Separate out select menu, prop should be array of pillars.
// Add null pillar or simply don't unless they tap into it? Clear selected pillar if they close the select menu?

export default function ContactView() {
    const { contactID, threadID } = useLocalSearchParams();
    const [contact, setContact] = useState<User>();
    const { user } = useAuth();
    const [selectedPillar, setSelectedPillar] = useState<Pillar>();
    const { Pillars } = usePillar();
    const router = useRouter();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["40%"], []);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const handlePresentPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);



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
            <View style={{ flex: 1 }} className="flex-col gap-3 bg-slate-200">
                <ContactBanner contact={contact as User} />
                <View className="flex-col bg-white p-3 m-3" style={{borderRadius: 10}}>
                    <ContactOption symbol={<FontAwesome name="refresh" size={15} color="gray" />} text="Change Pillar" handlePress={handlePresentPress}/>
                    <View style={{height: 1, backgroundColor: '#D1D5DB', marginVertical: 8}}/>
                    <ContactOption symbol={<FontAwesome6 name="people-group" size={15} color="gray" />} text="People" handlePress={handleNotFinishedPress}/>
                    <View style={{height: 1, backgroundColor: '#D1D5DB', marginVertical: 8}}/>
                    <ContactOption symbol={<FontAwesome5 name="lock" size={15} color="gray" />} text="Privacy and Security" handlePress={() => router.push({ pathname: "/privacy", params: { contactID } })}/>
                    <View style={{height: 1, backgroundColor: '#D1D5DB', marginVertical: 8}}/>
                    <ContactOption symbol={<FontAwesome6 name="paperclip" size={15} color="gray" />} text="Attachments" handlePress={handleNotFinishedPress}/>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    enableHandlePanningGesture={true}
                    handleComponent={null}
                    backdropComponent={renderBackdrop}
                    bottomInset={0}
                    detached={false}
                    style={styles.bottomSheetContainer}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <Text style={styles.titleText}>Select Pillar for this Thread</Text>
                        
                        <View style={styles.dropdownContainer}>
                            <SelectPillarDropDown showIcons={false} handleSelectPillar={handleSelectPillar}/>
                        </View>
                        
                        <View style={styles.selectedPillarContainer}>
                            <Text style={styles.selectedPillarText}>
                                Selected Pillar: {selectedPillar?.icon} {selectedPillar?.title}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.changePillarButton}
                            onPress={() => {
                                if (selectedPillar) {
                                    handlePillarChange(selectedPillar.id);
                                } else {
                                    alert("Please select a pillar first.");
                                }
                            }}
                        >
                            <Text style={styles.changePillarButtonText}>Change Pillar</Text>
                            <FontAwesome name="refresh" size={16} color="#007AFF" />
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

// Updated styles to match iOS design
const styles = StyleSheet.create({
    bottomSheetContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomSheetContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: 'white',
        alignItems: 'stretch',
    },
    titleText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    dropdownContainer: {
        marginBottom: 16,
        alignItems: 'center',
    },
    selectedPillarContainer: {
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedPillarText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
    },
    changePillarButton: {
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    changePillarButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007AFF',
    },
    dropdownButtonStyle: {
        width: 280,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    dropdownButtonTxtStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        flex: 1,
    },
    dropdownMenuStyle: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginTop: 4,
        width: 280,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
        color: '#000',
        textAlign: 'left',
    },
});