import { usePillar } from '@/context/pillarContext';
import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ICONS = {'Stocks':'📈',  'Family':'🏠', 'Work':'🧑‍💻', 'Games':'🎮', 'Hockey':'🏒', 'Friends':'🕺', 'Foodie':'🍔', 'Pick Image':'🖼️'};
const TITLES = ['Stocks','Family','Work','Games','Hockey','Friends','Foodie','Pick Image'];
export default function PillarAddColor() {

  const {setselectedicon} = usePillar();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: 'row',
                padding: 10, 
                marginHorizontal: 10,
                marginVertical: 5, 
                borderWidth: 1,
                borderColor: '#aaa',
                borderRadius: 12,
                backgroundColor: 'pink',
                gap: 1,}} >
            <Text style={{ fontSize: 24, marginRight: 2, borderRadius: 5}}>➕</Text>
            <Text>Add Icon</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Android back button
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
        <Text style={styles.title}>Select a Icon</Text>

            <FlatList
              data={Object.entries(ICONS)} 
              keyExtractor={([key]) => key}
              numColumns={1}
              contentContainerStyle={styles.grid}
              renderItem={({ item: [label, icon] }) => (
                <TouchableOpacity
                  onPress={() => {
                    setselectedicon(icon);
                    setModalVisible(false);
                  }}
                >
                  <View style={{flexDirection: 'row',  padding: 10 }}>
                    <Text style={{ fontSize: 20, marginRight: 10 }}>{icon}</Text>
                    <Text style={{ fontSize: 20 }}>{label}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#ccc',
                    marginHorizontal: 10,
                  }}
                />
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
  },
  modalBox: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Android shadow
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
    paddingVertical: 55,
  },
  closeButton: {
    textAlign: 'center',
    marginTop: 12,
    color: 'blue',
  },
});