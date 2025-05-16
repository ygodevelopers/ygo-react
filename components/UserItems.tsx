import { ActivityIndicator, Text, TouchableOpacity, View,Image } from "react-native";

export default function UserItems(item: any) {
    
    return (
        <View style={{ flexDirection: 'row'}} >
            <Image 
                source={{ uri: item?.item?.profileImageUrl}}//{{ uri: "@/assets/images/react-logo.png" }} // Replace with actual image URL
                style={{ width: 30, height: 30, borderRadius: 25 }}
                />
            <Text>{item?.item.firstName}</Text>
            <Text>    </Text>
            <Text>{item?.item?.email}</Text>
        </View>
    );
}