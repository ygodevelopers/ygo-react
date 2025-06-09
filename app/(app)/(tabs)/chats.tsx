import { TouchableOpacity, View } from "react-native";
import { UserList } from "@/components/UserList";
import { useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { Thread } from "@/types";
import { useAuth } from "@/context/authContext";
import { threadsCollection } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Chats() {

      const [threads, setThreads] = useState<Thread[]>([]);
      const router = useRouter();
      const {user} = useAuth();
      
      useFocusEffect(()=>{
          if(user?.id){
              getThreads();
          }
      })

      // TODO: Thread last update isn't real time even though messages are. Maybe create a listener for the thread too? 
      const getThreads = async () => {
          const threadsRef : Thread[] = [];
          const q = query(threadsCollection, where("uids", "array-contains", user?.id));
          const querySnapshot = await getDocs(q);
  
          querySnapshot.forEach(doc => {
              threadsRef.push(doc.data() as Thread);
          })
          setThreads(threadsRef);
      }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => {router.push('/AddContact')}}>
        <AntDesign name="plussquare" size={24} color="black" />
      </TouchableOpacity>
      <UserList threads={threads} router={router}/>
    </View>
  );
}