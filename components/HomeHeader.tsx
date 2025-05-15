import { View, Text, Platform , StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import {Image} from 'expo-image';
import { useAuth } from "@/context/authContext";
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from "./CustomMenuItem";
import '@/global.css';

const ios = Platform.OS== 'ios';
export default function HomeHeader() {

    const {user} = useAuth(); 

    const {top} = useSafeAreaInsets();

    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    const handleProfile = () => {}

    const handleLogOut = async () => {}


    return (
        <View style={{paddingTop: ios ? top: top+10}} className="flex-row justify-between px-5 bg-indigo-500"> 
            <View>
                <Text style={{fontSize: hp(3)}}>Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
                            source="https://picsum.photos/seed/696/3000/2000"
                            // TODO: ADD USER PROFILE PICTURE ONCE MODEL IS CREATED. CURRENTLY A PLACERHOLDER
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuItem text="Profile" value={1} action={handleProfile} icon={"a"}/>
                        <Divider/>
                        <MenuItem text="Sign Out" value={1} action={handleProfile} icon={"a"}/>
                    </MenuOptions>
                </Menu>
                
            </View>
        </View>
    )
}

// TODO: Add Divider to code once Tailwind /  reactwind have been installed.
/* TODO: ADD CUSTOM ICON USING FEATHER */

const Divider = () => {
    return (
        <View className="p-[1px] w-full bg-neutral-200"/>
    )
}