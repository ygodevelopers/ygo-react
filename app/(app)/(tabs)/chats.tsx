import { Text, View } from "react-native";
import { useEffect } from "react";
import { app } from "@/firebaseConfig";
import { UserList } from "@/components/UserList";

export default function Chats() {

  useEffect(() => {
    console.log('Firebase App:', app); // Check if the app object exists
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserList/>
    </View>
  );
}