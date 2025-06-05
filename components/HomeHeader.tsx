import { View, Text, Platform} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/authContext";

import { MenuItem } from "./CustomMenuItem";
import '@/global.css';

const ios = Platform.OS== 'ios';
export default function HomeHeader() {

    const {user} = useAuth(); 

    const {top} = useSafeAreaInsets();

    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';




    return (
        <View style={{paddingTop: ios ? top: top+10}} className="flex-row justify-between px-5 bg-indigo-500"> 
            <View>
                <Text style={{fontSize: hp(3)}}>Chats</Text>
            </View>
        </View>
    )
}