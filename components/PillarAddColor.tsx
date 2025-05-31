import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity,FlatList } from 'react-native';

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray', 'brown', 'black', 'cyan', 'mint'];

type PillarAddColorProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

export default function PillarAddColor({ selectedColor, setSelectedColor }:PillarAddColorProps) {

  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
        <View style={{ flexDirection: 'row',
                padding: 10, 
                marginHorizontal: 10,
                marginVertical: 5, 
                borderWidth: 1,
                borderColor: '#aaa',
                borderRadius: 12,
                backgroundColor: 'pink',
                gap: 1,}} >
            <View style={[styles.colorCircle, { backgroundColor: selectedColor }]} />
      
            <Text>Add Color</Text>
        </View>
      </TouchableOpacity>
   {/* Color Picker Modal */}
   <Modal
        visible={isColorPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setColorPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select a Color</Text>

            <FlatList
              data={COLORS}
              keyExtractor={(item) => item}
              numColumns={4}
              contentContainerStyle={styles.grid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.colorCircle,
                    { backgroundColor: item },
                    selectedColor === item && styles.selectedCircle,
                  ]}
                  onPress={() => {
                    setSelectedColor(item);
                    setColorPickerVisible(false);
                  }}
                />
              )}
            />

            <TouchableOpacity onPress={() => setColorPickerVisible(false)}>
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
  colorBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    width: '80%',
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
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: 'white',
  },
  closeButton: {
    textAlign: 'center',
    marginTop: 12,
    color: 'blue',
  },
});