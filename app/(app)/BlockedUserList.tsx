import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, } from "react-native";
import { unblockUser, fetchBlockedUsers } from "@/components/BlockUser";
import { useAuth } from "@/context/authContext";
import { User } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function BlockedUsersScreen() {
  const { user } = useAuth();
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadBlockedUsers = async () => {
    if (!user?.id) return;
    setLoading(true);
    const users = await fetchBlockedUsers(user.id);
    setBlockedUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  const handleUnblock = async (blockedUserId: string) => {
    try {
      await unblockUser(user.id, blockedUserId);
      setModalVisible(false);
      setSelectedUser(null);
      loadBlockedUsers();
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.unblockButton}
        onPress={() => {
          setSelectedUser(item);
          setModalVisible(true);
        }}
      >
        <FontAwesome name="times-circle" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blocked Users</Text>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : blockedUsers.length === 0 ? (
        <Text style={styles.empty}>You have not blocked anyone.</Text>
      ) : (
        <FlatList
          data={blockedUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Modal unblock */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to unblock this user?
            </Text>
            <Text style={styles.modalMessage}>
              {selectedUser?.firstName} {selectedUser?.lastName} will be able to message you again.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.buttonHalf}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectedUser && handleUnblock(selectedUser.id)}
                style={styles.buttonHalf}
              >
                <Text style={styles.unblockText}>Unblock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontWeight: "bold", fontSize: 16 },
  email: { fontSize: 14, color: "gray" },
  unblockButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
  },
  // Modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonHalf: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  cancelText: {
    color: "blue",
    fontSize: 16,
  },
  unblockText: {
    color: "red",
    fontSize: 16,
  },
});
