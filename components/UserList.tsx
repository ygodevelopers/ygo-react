import { View, FlatList} from "react-native";
import { StatusBar } from 'expo-status-bar'
import UserItems from '@/components/UserItems'
import { Thread } from "@/types";
import { Router} from "expo-router";

export const UserList = ({threads, router} : {threads: Thread[], router: Router}) => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <StatusBar style="light" />     
            {
                threads.length > 0 ? (
                    <View className="flex-1">
                        <FlatList
                            data = {threads}
                            contentContainerStyle = {{flex:1, paddingVertical: 25}}
                            keyExtractor={(item: Thread, index) => index.toString()}
                            showsVerticalScrollIndicator = {false}
                            renderItem={({item, index})=><UserItems item={item} router={router}/>}
                            />

                    </View>
                ):(
                    <View className="flex item-center">

                    </View>
                )
            }
        </View>
    )
}