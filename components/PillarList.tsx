import { ActivityIndicator, Text, View, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";

import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@/context/authContext'
import { PillarItems } from '@/components/PillarItems'
import {usePillar} from '@/context/pillarContext'
import { useRouter} from "expo-router";



// type Props = NativeStackScreenProps<PillarStackParamList, 'Home'>;

export const PillarList = () => {
    const {user} = useAuth();
    const {getPillars, Pillars, loading} = usePillar();

    const router = useRouter();

    useEffect(()=>{
          if(user?.id){
            getPillars();
        }
    },[user])


    const combinedData = [...Pillars, { icon: '➕', title: 'New Pillar',type:'new' }];

    return (
        <View
            style={{
                flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
            }}
            >
            <StatusBar style="light" />      
            {/* <Text>Pillars List</Text>       */}
            {
                !loading ? (
                    <View className = "flex-1">
                        <FlatList
                            data = {combinedData}
                            contentContainerStyle = {{flex:1, paddingVertical: 55}}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator = {false}
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            renderItem={({item, index})=><PillarItems item={item} router={router}/>}
                            />
      
                    </View>
                ):(
                    <View className="flex item-center">
                        <ActivityIndicator size="large" />
                    </View>
                )
            }
        </View>
    )
}
