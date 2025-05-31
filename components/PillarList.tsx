import { ActivityIndicator, Text, View, FlatList, StyleSheet} from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar'
import { getDocs, query, where } from 'firebase/firestore'
import { pillarRef } from '@/firebaseConfig'
import PillarItems from '@/components/PillarItems'

export const PillarList = () => {
    const {user} = useAuth();
    const [Pillars, setPillars] = useState<Pillar[]>([]);

    interface Pillar {
        color: string;   
        icon: string;       
        id: string; 
        subPillars: string[];
        title: string;
        type: string;
        userId: string;
        // Add other fields as needed
    }

    useEffect(()=>{
        console.log("PillarList: ", Pillars)
        if(user?.id){
            getPillars();
        }
    },[])

    const getPillars = async()=>{
        //fetch pillars
        const q = query(pillarRef, where('userId','==',user?.id));
        const querySnapshot = await getDocs(q);
        let data:Pillar[] = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data() as Pillar});
        })
        console.log("fetch Pillars: ", data);
        setPillars(data);
    }

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
