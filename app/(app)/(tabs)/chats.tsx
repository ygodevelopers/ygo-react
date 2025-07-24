import { TouchableOpacity, View, Text, SafeAreaView, StatusBar } from "react-native";
import { UserList } from "@/components/UserList";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Chats() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white">     
      <StatusBar barStyle={'dark-content'}/>

      <View className="items-center">
        <View style={{paddingTop: insets.top, width: '85%'}}>
          <View className="px-4 py-3 flex-row items-center gap-3" style={{backgroundColor: "#d3d3d3", borderRadius: 10, overflow: "hidden"}}>
            <AntDesign name="search1" size={18} color="#8E8E93"/>
            <Text className="ml-3 text-gray-500 text-base">Search...</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center px-4" style={{marginTop: 16}}>
        <View className="flex-1 items-center">
          <Text className="font-bold text-black" style={{fontSize: hp(2)}}>Chats</Text>
        </View>
        <TouchableOpacity 
          onPress={() => {router.push('/AddContact')}}>
          <AntDesign name="plussquare" size={30} color="#9C52FF"/>
        </TouchableOpacity>
      </View>

      <UserList pillarid={null}/>
    </SafeAreaView>
  );
}