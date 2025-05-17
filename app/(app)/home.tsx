import { ActivityIndicator, Text, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function StartPage() {

    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>Home!</Text>
        </View>
    );
}