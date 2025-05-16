import { ActivityIndicator, Text, TouchableOpacity, View, Image, Icon } from "react-native";

export default function PalliarItems(item: any) {
    
    return (
        <View style={{ flexDirection: 'row'}} >
            <Text>{item?.item?.icon}</Text>
            <Text>{item?.item?.title}</Text>

        </View>
    );
}