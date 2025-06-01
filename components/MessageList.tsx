import { Message } from "@/types";
import { View, Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const MessageList = ({messages}: {messages: Message[]}) => {
    
    return (
        <View className="flex-1 flex-col justify-center items-center">
            {
                messages.map((message) => (<Text key={message.id}>{message.messageText}</Text>))
            }
        </View>
    )
}