import { ActivityIndicator, Text, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SplashScreen from "./splash";

export default function StartPage() {


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SplashScreen />
      {/* <ActivityIndicator size="large" color="gray" /> */}
    </View>
  );
}
