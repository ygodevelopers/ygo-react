import { Thread, Message} from "@/types";
import { db } from "@/firebaseConfig";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";

export const fetchPreviousMessages =  async (threadID : string) : Promise<Message[]> => {
    const messages : Message[] = [];
    try {
        const threadDoc = doc(db, 'threads' ,threadID);
        const messageCollection = collection(threadDoc, 'messages');
        
        const querySnapshot = query(messageCollection, orderBy("timestamp", "desc"));
        const messagesOrdered = await getDocs(querySnapshot);

        messagesOrdered.forEach((doc) => {
            messages.push(doc.data() as Message);
        })  

        console.log(messages);
        
    }
    catch (e) {
        console.log(e);
    }

    return messages;
}