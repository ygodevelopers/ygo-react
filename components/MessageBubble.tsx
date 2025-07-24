import { View, Text, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

export const MessageBubble = ({ message, fromUser }: { message: string, fromUser: boolean }) => {
    return (
        <View
            className={`${fromUser ? 'self-end' : 'self-start'} m-1`}
            style={{
                maxWidth: screenWidth * 0.7,
                alignSelf: fromUser ? 'flex-end' : 'flex-start',
            }}
        >
            <View
                className={`${fromUser ? 'bg-blue-500' : 'bg-slate-400'} rounded-3xl px-4 py-3 shadow-sm`}
            >
                <Text
                    className="text-white"
                    style={{ flexWrap: 'wrap' }}
                >
                    {message}
                </Text>
            </View>
        </View>
    );
};
