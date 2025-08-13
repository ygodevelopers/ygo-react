import { View } from "react-native";
import UserProfile from "@/components/UserProfile";



export default function Index() {

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