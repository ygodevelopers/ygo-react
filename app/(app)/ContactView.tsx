import { View, Text } from "react-native";


// TODO: Look into Tanstack Query for state management. Dont really want to pass the threadID or the contactID between pages and then query them for each time i need it. Violates dry.
// The information also won't change as you cannot change a contacts information, they set it themselves. Would rather store user information in local storage somehow and then delete it once user changes? Or is it better to pull it each time?
export default function ContactView() {
    return 
}