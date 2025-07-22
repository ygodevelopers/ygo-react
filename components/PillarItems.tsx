import { Pillar } from '@/types';
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput,StyleSheet, Dimensions,Modal } from "react-native";
import { Router } from "expo-router";

import PillarAddColor from '@/components/PillarAddColor';
import PillarAddIcon from '@/components/PillarAddIcon';
import {usePillar} from '@/context/pillarContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";



const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (screenWidth - 16 * 2 - 16) / 2; 


export const PillarItems=({item, router}:{item: Pillar, router: Router})=> {
    
    const {         
        selectedColor, 
        pillarname, 
        selectedicon,
        getPillars,
        savePillars,
        modalNewVisible,
        setModalNewVisible,
        subpillar,
        setsubpillar,
        addSubPillar,
        currentPillar,
        setcurrentPillar
        } = usePillar();

        const emojis = Array.from(item.icon || "");
        const emoji1 = emojis[0];
        const emoji2 = emojis[1];

    const handlePress = () => {

        if (item?.title === 'New Pillar') {
            setModalNewVisible(true);
        }
        else {

             router.push({pathname: '/pillarDetail', params: {pillarId: item.id, pillarTitle: item.title, pillarIcon:item.icon,subpillars: JSON.stringify(item.subPillars) }});
             setcurrentPillar(item);
            // item={item} setModalEditVisible={setModalEditVisible} handleSubPillar={handleSubPillar}
    
           // setModalEditVisible(true);
        }
        // Add your navigation or action here
    };

    const handleSavePillar = async() => {
        if(subpillar){
            const newSub: Pillar = {
            //get uuid with capital letter
            id: uuidv4().toUpperCase(),
            title: pillarname,
            icon: selectedicon,
            color: selectedColor,
            type: 'sub',
            subPillars: [],
            userId: currentPillar?.userId, // Assuming you have a userId in the item
            };
            console.log("subpillar adding", currentPillar.id);
            console.log("subpillar newSub", newSub);
            const result = await addSubPillar(currentPillar.id, newSub);
            if (result.success) {
                console.log("SubPillar added!");
                let item = currentPillar;
                item.subPillars.push(newSub);
                setcurrentPillar(item);
            } else {
                console.error("SubPillar Failed:", result.msg);
            }
            setsubpillar(false);

        }else{
            await savePillars(uuidv4().toUpperCase(), pillarname, selectedColor, selectedicon);     
        }
        getPillars();
        setModalNewVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10, 
                    marginHorizontal: 10,
                    marginVertical: 5, 
                    width: ITEM_WIDTH,
                    borderWidth: 2,
                    borderColor: '#aaa',
                    borderRadius: 12,
                    gap: 8,
                    elevation: 25,
                    backgroundColor: 'white'
                    }} >
                        {item.type === 'new' ? 
                        (
                            <Text style={{ fontSize: 24, width:40, color:'red'}}>{item?.icon}</Text>
                        )
                        
                        :(
                            <>
                            <Text style={[styles.icon,{borderColor: item.color}]}>{emoji1}</Text>
                            {/* <Text style={{ fontSize: 24, width:40, borderWidth: 3, borderColor: item.color, borderRadius: 10, textAlign: 'center',textAlignVertical: 'center'}}>{emoji2}</Text> */}
                            </>
                        )}
                        <Text style={styles.title}>{item?.title}</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={modalNewVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginBottom: 20,marginTop: 20  }}>
                        <TouchableOpacity onPress={() => setModalNewVisible(false)}>    
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <Text>Create Pillar</Text>
                        <TouchableOpacity onPress={() => handleSavePillar()}>    
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <NewPillar />
                </View>
            </Modal>
        </>
    );
}

function NewPillar(){
    const {selectedColor, pillarname, setpillarName, selectedicon, setselectedicon} = usePillar();
    useEffect(() => {
        setselectedicon('📸');
    }, []);
    return(
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>

            <Text style={{ fontSize: 48,  marginRight: 0, borderWidth: 3, borderColor: selectedColor, borderRadius: 15 ,color: 'gold'}}>{selectedicon}</Text>
            <View style={{ flexDirection: 'row'}}>
                <PillarAddIcon />
                <PillarAddColor />
            </View> 
            <TextInput
                    style={{borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 10,
                            fontSize: 16,
                            borderRadius: 6,
                            marginBottom: 20,}}
                    placeholder="Pillar Name"
                    value={pillarname}
                    onChangeText={setpillarName}
                />
        </View>
   
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: {  fontSize: 24, width:40, borderWidth: 3, borderRadius: 10, textAlign: 'center',textAlignVertical: 'center' },
  title: { fontSize: 18, marginTop: 8 },
});