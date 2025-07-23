import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { blockUser } from "@/components/BlockUser";
import { useAuth } from "@/context/authContext";

export default function PrivacyAndSecurityModal({ contact, onClose }: { contact: any; onClose: () => void }) {

    const { user } = useAuth();

    const handleBlockUser = async () => {
        try {
            if (!user?.id || !contact?.id) {
                Alert.alert("Error", "Missing user information.");
                return;
            }

            await blockUser(user.id, contact.id);

            Alert.alert("User Blocked", `${contact.firstName} has been blocked.`);
            onClose();
        } catch (err) {
            console.error("Failed to block user:", err);
            Alert.alert("Error", "Could not block the user.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Block {contact.firstName} {contact.lastName} ?</Text>

            <Text style={styles.description}>Blocked contacts will no longer be able to message you</Text>

            <TouchableOpacity style={styles.blockRow} onPress={handleBlockUser}>
                <Text style={styles.blockText}>Block</Text>
                <View style={styles.blockIconContainer}>
                    <FontAwesome name="minus" size={16} color="white" />
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.option} onPress={onClose}>
                <Text style={{ color: 'blue', fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  blockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  blockText: {
    fontSize: 16,
    color: 'red',
  },
  blockIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    paddingVertical: 10,
  },
});