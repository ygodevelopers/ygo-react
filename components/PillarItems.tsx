import { ActivityIndicator, Text, TouchableOpacity, View, Image } from "react-native";
import { Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { Modal } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (screenWidth - 16 * 2 - 16) / 2; 


export default function PalliarItems(item: any) {

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {

        if (item?.item?.title === 'New Pillar') {
            setModalVisible(true);
        }
        else {
            console.log("Pressed:", item?.item?.title);
        }
        // Add your navigation or action here
    };
    console.log("item.icon", item?.item?.icon);
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
                        (<Text style={{ fontSize: 24, width:40, marginRight: 8, borderWidth: 1, borderColor: 'black', borderRadius: 5 ,backgroundColor:'gray',color: 'gold'}}>{item?.item?.icon}</Text>)
                        
                        :(
                            <Text style={{ fontSize: 24, marginRight: 8, borderWidth: 1, borderColor: 'black', borderRadius: 5 ,backgroundColor:'gray'}}>{item?.item?.icon}</Text>
                        )}
                        <Text>{item?.item?.title}</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginBottom: 20,marginTop: 20  }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>    
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <Text>Create Pillar</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>    
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
    return(
        <view>
            <Text>Create New Pillar</Text>
        </view>
   
    )
}