import { Message } from "@/types";
import { db } from "@/firebaseConfig";
import { collection, doc, orderBy, query, onSnapshot, Unsubscribe } from "firebase/firestore";

export const subscribeToMessages = (
    threadID: string, 
    callback: (messages: Message[]) => void
): Unsubscribe => {
    try {
        const threadDoc = doc(db, 'threads', threadID);
        const messageCollection = collection(threadDoc, 'messages');
        
        const querySnapshot = query(messageCollection, orderBy("timestamp", "asc"));
        
        const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
            const messages: Message[] = [];
            snapshot.forEach((doc) => {
                messages.push(doc.data() as Message);
            });
            console.log("Fetching messages");
            callback(messages);
        }, (error) => {
            console.log("Error listening to messages:", error);
        });

        return unsubscribe;
    } catch (e) {
        console.log("Error setting up message subscription:", e);
        // Return a no-op unsubscribe function in case of error
        return () => {};
    }
}