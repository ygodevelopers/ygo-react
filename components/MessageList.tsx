import { Message } from "@/types";
import { View, Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const MessageList = ({messages}: {messages: Message[]}) => {
    return (
        <View>
            <Text>Message List</Text>
        </View>
    )
}