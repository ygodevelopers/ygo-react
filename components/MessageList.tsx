import { Message } from "@/types";
import { View, Text } from "react-native";
import { MessageBubble } from "./MessageBubble";
import { FlatList } from 'react-native';


export const MessageList = ({ messages, userID }: { messages: Message[], userID: string }) => {
    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item.messageText}
                    fromUser={userID === item.fromId}
                />
            )}
            contentContainerStyle={{ paddingBottom: 12}}
        />
    );
};