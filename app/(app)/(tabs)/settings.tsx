import { Text, View, Button } from "react-native";
import { useEffect } from "react";
import { app }  from "@/firebaseConfig";
import UserProfile from "@/components/UserProfile";



export default function Index() {

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
      <UserProfile />
    </View>
  );
}