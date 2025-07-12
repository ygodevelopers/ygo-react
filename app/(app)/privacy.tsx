import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PrivacyAndSecurityModal from "@/components/PrivacyAndSecurityModal";
import { useLocalSearchParams } from "expo-router";
import { userRef } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { User } from "@/types";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function PrivacyScreen() {
    const { contactID } = useLocalSearchParams();
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [contact, setContact] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        const fetchContact = async () => {
            if (!contactID) return;

            const q = query(userRef, where("id", "==", contactID));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => setContact(doc.data() as User));
        };

        fetchContact();
    }, [contactID]);

    const options = [
        {
            label: "Remove Contact",
            icon: <FontAwesome name="user-times" size={20} color="black" />,
            onPress: () => alert("Remove contact"),
        },
        {
            label: "Block",
            icon: <FontAwesome5 name="ban" size={20} color="black" />,
            onPress: () => setShowBlockModal(true),
        },
        {
            label: "Manage Block List",
            icon: <FontAwesome6 name="list" size={20} color="black" />,
            onPress: () => router.push("/BlockedUserList"),
        },
        {
            label: "Something’s Wrong",
            icon: <FontAwesome5 name="exclamation-circle" size={20} color="black" />,
            onPress: () => alert("Something’s Wrong"),
        },
        {
            label: "Delete Chat",
            icon: <FontAwesome name="trash" size={20} color="red" />,
            onPress: () => alert("Delete Chat"),
            isDanger: true,
        },
    ];

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={item.onPress}
                    >
                        <View style={styles.icon}>{item.icon}</View>
                        <Text
                            style={[
                                styles.label,
                                item.isDanger && { color: "red", fontWeight: "bold" },
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Modal for block user*/}
            {showBlockModal && contact && (
                <View style={styles.modalWrapper}>
                    <PrivacyAndSecurityModal
                        contact={contact}
                        onClose={() => setShowBlockModal(false)}
                    />
                </View>
            )}
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    icon: {
        marginRight: 15,
        width: 30,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        color: "black",
    },
    modalWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
