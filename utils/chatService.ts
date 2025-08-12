import { Message, Thread, User } from "@/types";
import { db, threadsCollection } from "@/firebaseConfig";
import { collection, doc, orderBy, query, onSnapshot, Unsubscribe, serverTimestamp, Timestamp, setDoc, where } from "firebase/firestore";

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

export const subscribeToThreads = ( 
    userID: string,
    callback: (threads: Thread[]) => void
): Unsubscribe => {
    try {
        const conditions = [where("uids", "array-contains", userID)];
        const q = query(threadsCollection, ...conditions);
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const threads: Thread[] = [];
            snapshot.forEach((doc) => {
                threads.push(doc.data() as Thread);
            });
            callback(threads);
        }, (error) => {
            console.log("Error listening to threads:", error);
        });

        return unsubscribe;
    } catch (e) {
        console.log("Error setting up threads subscription:", e);
        return () => {};
    }
}



export const createThread = async (contact: User, user: User) : Promise<string> => {
        const threadRef = doc(threadsCollection); 


        const thread : Omit<Thread, "firstMessageId"|"lastMessage"> = {
            lastUpdated: serverTimestamp() as Timestamp,
            uids: [user.id, contact!.id],
            users: [user, contact],
            id: threadRef.id 
        };

        try {
            await setDoc(threadRef, thread);
            return threadRef.id;
        } catch (error) {
            return error instanceof Error ? error.message : String(error);
        }
}