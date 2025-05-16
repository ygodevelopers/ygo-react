import { Text, View, Button } from "react-native";
import { useEffect } from "react";
import { app }  from "@/firebaseConfig";
import { useAuth } from "@/context/authContext"

export default function Index() {

  useEffect(() => {
    console.log('Firebase App:', app); // Check if the app object exists
  }, []);

  const {logout, user} = useAuth();

  const handleLogout=async()=>{
    await logout()
    console.log("logout success: ", user);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Settings.</Text>
      <Button title="Log out" onPress={handleLogout}/>
    </View>
  );
}