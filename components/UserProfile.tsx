import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Switch } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/context/authContext"
import uploadImageToFirebase from "@/components/ImageUploadType";
import { db } from "@/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";



const { height, width } = Dimensions.get("window");

export default function UserProfile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isEnabled, setIsEnabled] = useState(false);
  const { logout, user } = useAuth();
  const [activeStatus, setActiveStatus] = useState(false);

  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfileImage = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.id));
        if (userDoc.exists()) {
          const data = userDoc.data();

          if (data?.profileImageUrl && typeof data.profileImageUrl === "string") {
            const finalUrl = data.profileImageUrl.includes("?alt=media")
              ? data.profileImageUrl
              : `${data.profileImageUrl}?alt=media`;
            setProfileImage(finalUrl);
          } else {
            console.warn("profileImageUrl is missing or invalid");
          }

          if (data?.activeStatus !== undefined) {
            setActiveStatus(data.activeStatus);
          }
        }
      } catch (err) {
        console.error("Error loading profile image or activeStatus:", err);
      }
    };
    fetchProfileImage();
  }, [user?.uid]);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissions required", "Access to the gallery is needed to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
      try {
        const downloadUrl = await uploadImageToFirebase(selectedImageUri, "profile");
        const userDocRef = doc(db, "users", user.id);
        const finalDownloadUrl = downloadUrl.includes("?alt=media")
          ? downloadUrl
          : `${downloadUrl}?alt=media`;
        await updateDoc(userDocRef, {
          profileImageUrl: finalDownloadUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "imagen din not uploaded");
      }
    }
  };


  const toggleActiveStatus = async () => {
    const newStatus = !activeStatus;
    setActiveStatus(newStatus);

    try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, { activeStatus: newStatus });
    } catch (err) {
      console.error("Error updating active status:", err);
    }
  };




  return (
    <View style={styles.container}>

      {/* profile picture */}

      <View style={styles.profileHeader}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={handleImagePicker}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <FontAwesome name="user-circle" size={100} color="gray" />
            )}
          </TouchableOpacity>

          {/* Status Dot Overlay */}
          <TouchableOpacity onPress={toggleActiveStatus} style={styles.statusDotOverlay}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: activeStatus ? "green" : "gray" },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>


      {/* body 1*/}
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Active Status */}

          <View style={styles.optionRow}>
            <Ionicons name="chatbubbles" size={24} color="green" style={styles.optionIcon} />
            <Text style={styles.optionText}>Active Status</Text>
            <Switch
              value={activeStatus}
              onValueChange={toggleActiveStatus}
              style={{ marginLeft: 'auto' }}
            />
          </View>

          {/* Privacy */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => router.push("/(app)/BlockedUserList")}>
            <Ionicons name="lock-closed" size={24} color="blue" style={styles.optionIcon} />
            <Text style={styles.optionText}>Privacy</Text>
          </TouchableOpacity>

          {/* Push Notifications with Toggle */}
          <View style={styles.optionRow}>
            <Ionicons name="notifications" size={24} color="purple" style={styles.optionIcon} />
            <Text style={styles.optionText}>Push Notifications</Text>
            <Switch
              value={isEnabled}
              onValueChange={(value) => setIsEnabled(value)}
              style={{ marginLeft: 'auto' }}
            />
          </View>

          {/* Usage Reports */}
          <TouchableOpacity style={styles.optionRow}>
            <Ionicons name="bar-chart" size={24} color="orange" style={styles.optionIcon} />
            <Text style={styles.optionText}>Usage Reports</Text>
          </TouchableOpacity>
        </View>

        {/* body 2*/}
        <View style={styles.card}>
          <TouchableOpacity onPress={handleLogout} style={styles.dangerOption}>
            <Text style={styles.dangerText} >Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerOption}>
            <Text style={styles.dangerText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  profileHeader: {
    height: height * 0.2,
    width: width,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  dangerOption: {
    paddingVertical: 15,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 10,
  },
  dangerText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '500',
  },

  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },

  statusDotOverlay: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },

});
