import { Pillar } from '@/types'
import { ActivityIndicator, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { Modal } from 'react-native';
import PillarAddColor from '@/components/PillarAddColor';
import PillarAddIcon from '@/components/PillarAddIcon';
import {usePillar} from '@/context/pillarContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (screenWidth - 16 * 2 - 16) / 2; 


export const PillarItems=({item}:{item: Pillar})=> {

    const [modalVisible, setModalVisible] = useState(false);
    
    const navigation = useNavigation();
    const {         
        selectedColor, 
        pillarname, 
        selectedicon,
        getPillars,
        savePillars
    } = usePillar();

    const handlePress = () => {

        if (item?.title === 'New Pillar') {
            setModalVisible(true);
        }
        else {
            // navigation.navigate('PillarDetail', { pillar: item })}
            // console.log("Pressed:", item?.title);
        }
        // Add your navigation or action here
    };

    const handleSavePillar = () => {
        
        savePillars(uuidv4(), pillarname, selectedColor, selectedicon);
        getPillars();
        setModalVisible(false);
    };

    console.log("item.icon", item?.icon);
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
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginBottom: 20,marginTop: 20  }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>    
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