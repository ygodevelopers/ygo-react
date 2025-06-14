import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Pillar } from '@/types';
import { UserList } from "@/components/UserList";
import { PillarContact } from './PillarContact';



export const PillarDetail = ({ item, setModalEditVisible, handleSubPillar  }: { item: Pillar; setModalEditVisible: (visible: boolean) => void; handleSubPillar: () => void; }) => {
  console.log("PillarDetail item id: ", item.id);
  const hasSubPillars = item.subPillars && item.subPillars.length > 0;
  console.log("PillarDetail subpillars: ", hasSubPillars);
  const [modalcontactVisible, setModalContact] = useState(false);

  const handleContacts = () => {
    setModalContact(true);
    // setModalEditVisible(false)

};
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginBottom: 20,marginTop: 20  }}>
          <TouchableOpacity onPress={() => setModalEditVisible(false)}>    
              <Text style={styles.title}>{"<"}Pillars</Text>
          </TouchableOpacity>
          <Text style={styles.icon}>{item?.icon + item?.title}</Text>
          <TouchableOpacity onPress={() => handleContacts()}>    
              <Text style={styles.title}>➕</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {hasSubPillars ? (
          item.subPillars.map((sub, index) => (
            <View key={sub.id || index} style={{
                    flexDirection: 'row',
                    padding: 10, 
                    marginHorizontal: 10,
                    marginVertical: 5, 
                    width: 200,
                    borderWidth: 1,
                    borderColor: '#aaa',
                    borderRadius: 12,
                    gap: 8,}} >
              <Text style={styles.icon}>{sub.icon}</Text>
              <Text style={styles.title}>{sub.title}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: 'gray' }}>No subpillars</Text>
        )}
     
      </View>
      <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >Chats</Text>
      <View style={styles.container}>
        <UserList pillarid={item.id}/>
      </View>

      <Modal visible={modalcontactVisible} animationType="slide">
        <PillarContact setModalContact={setModalContact}/>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});