import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import { UserList } from "@/components/UserList";
import { useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { Thread } from "@/types";
import { useAuth } from "@/context/authContext";
import { threadsCollection } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chats() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const router = useRouter();
  const {user} = useAuth();
  
  useEffect(()=>{
      if(user?.id){
          getThreads();
      }
  },[]);

  const getThreads = async () => {
      const threadsRef : Thread[] = [];
      const q = query(threadsCollection, where("uids", "array-contains", user?.id));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(doc => {
          console.log(doc.data());
          threadsRef.push(doc.data() as Thread);
      })
      setThreads(threadsRef);
  }

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="px-4 pb-2 pt-2" style={{paddingTop: insets.top}}>
        <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
          <AntDesign name="search1" size={16} color="#8E8E93" />
          <Text className="ml-2 text-gray-500">Search...</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center px-4 pb-2">
        <View>
          <Text className="text-3xl font-bold text-black text-center">Chats</Text>
        </View>
        <TouchableOpacity onPress={() => {router.push('/AddContact')}}>
          <AntDesign name="plussquare" size={24} color="#9C52FF" />
        </TouchableOpacity>
      </View>
      
      <UserList pillarid={null}/>
    </SafeAreaView>
  );
}