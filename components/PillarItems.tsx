import { Pillar } from '@/types'
import { ActivityIndicator, Text, TouchableOpacity, View, Image, TextInput,StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { Modal } from 'react-native';
import PillarAddColor from '@/components/PillarAddColor';
import PillarAddIcon from '@/components/PillarAddIcon';
import {usePillar} from '@/context/pillarContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
// import { PillarDetail } from '@/app/(app)/pillarDetail';
import { Router } from "expo-router";


const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (screenWidth - 16 * 2 - 16) / 2; 


export const PillarItems=({item, router}:{item: Pillar, router: Router})=> {

    const [modalNewVisible, setModalNewVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [subpillar, setsubpillar] = useState(false);
    
    const {         
        selectedColor, 
        pillarname, 
        selectedicon,
        getPillars,
        savePillars,
        addSubPillar
        } = usePillar();

    const handlePress = () => {

        if (item?.title === 'New Pillar') {
            setModalNewVisible(true);
        }
        else {

             router.push({pathname: '/pillarDetail', params: {pillarId: item.id, pillarTitle: item.title, pillarIcon:item.icon,subpillars: JSON.stringify(item.subPillars) }});
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
            userId: item?.userId, // Assuming you have a userId in the item
            };
            const result = await addSubPillar(item.id, newSub);
            if (result.success) {
                console.log("SubPillar added!");
            } else {
                console.error("Failed:", result.msg);
            }
            setsubpillar(false);
            setModalEditVisible(true);

        }else{
            await savePillars(uuidv4(), pillarname, selectedColor, selectedicon);     
        }
        getPillars();
        setModalNewVisible(false);
    };

    const handleSubPillar = () => {
        setsubpillar(true);
        // savePillars(uuidv4(), pillarname, selectedColor, selectedicon);
        // getPillars();
        // setModalNewVisible(false);
        setModalEditVisible(false)
        setModalNewVisible(true);
     
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
                    borderWidth: 1,
                    borderColor: '#aaa',
                    borderRadius: 12,
                    gap: 8,}} >
                        {item.type === 'new' ? 
                        (<Text style={{ fontSize: 24, width:40, marginRight: 8, borderWidth: 1, borderColor: 'black', borderRadius: 5 ,backgroundColor:'gray',color: 'gold'}}>{item?.icon}</Text>)
                        
                        :(
                            <Text style={{ fontSize: 24, marginRight: 8, borderWidth: 1, borderColor: 'black', borderRadius: 5 ,backgroundColor:'gray'}}>{item?.icon}</Text>
                        )}
                        <Text>{item?.title}</Text>
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

            {/* <Modal visible={modalEditVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {item && <PillarDetail item={item} setModalEditVisible={setModalEditVisible} handleSubPillar={handleSubPillar}/>}
                </View>
            </Modal> */}
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

            <Text style={{ fontSize: 48,  marginRight: 0, borderWidth: 3, borderColor: selectedColor, borderRadius: 5 ,backgroundColor:'gray',color: 'gold'}}>{selectedicon}</Text>
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
  icon: { fontSize: 20 },
  title: { fontSize: 20, marginTop: 12 },
});