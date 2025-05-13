import { Text, View } from "react-native";
import { useEffect } from "react";
import app from "@/firebaseConfig";

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
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
