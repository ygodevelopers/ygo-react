import { View, Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type props = {
    messages: Array<string>,
}

export const MessageList = ({messages}: props) => {
    return (
        <View>
            <Text>Message List</Text>
        </View>
    )
}