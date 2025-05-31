import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function PillarAddColor() {
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
            <Text>This is a popup!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
});