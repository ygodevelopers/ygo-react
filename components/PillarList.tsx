import { ActivityIndicator, Text, View, FlatList, StyleSheet} from "react-native";
import { useEffect, useState } from "react";

import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@/context/authContext'
import PillarItems from '@/components/PillarItems'
import {usePillar} from '@/context/pillarContext'

export const PillarList = () => {
    const {user} = useAuth();
    const {getPillars, Pillars} = usePillar();
    useEffect(()=>{
        console.log("PillarList: ", Pillars)
        if(user?.id){
            getPillars();
        }
    },[])

    const combinedData = [...Pillars, { icon: '➕', title: 'New Pillar' }];

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
                Pillars.length > 0 ? (
                    <View className = "flex-1">
                        <FlatList
                            data = {combinedData}
                            contentContainerStyle = {{flex:1, paddingVertical: 55}}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator = {false}
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            renderItem={({item, index})=><PillarItems item={item}/>}
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
