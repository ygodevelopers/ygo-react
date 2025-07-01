import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Pillar } from '@/types';
import { UserList } from "@/components/UserList";
import { PillarContact } from '../../components/PillarContact';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function PillarDetail ()  {
  const { pillarId, pillarTitle,pillarIcon, subpillars } = useLocalSearchParams();
  const parsedSubpillars: Pillar[] = JSON.parse(
    Array.isArray(subpillars) ? subpillars[0] : subpillars
  );

  const router = useRouter();

  console.log("PillarDetail item id: ", pillarId);
  const hasSubPillars = parsedSubpillars && parsedSubpillars.length > 0;
  console.log("PillarDetail subpillars: ", hasSubPillars);
  const [modalcontactVisible, setModalContact] = useState(false);

  const handleContacts = () => {
    setModalContact(true);
    // setModalEditVisible(false)

};
  return (
    <>
            <Stack.Screen options={{
            title: '',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.title}>{"<"}Pillars</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => (
               <Text style={[styles.icon, { textAlign: 'center', width: '100%' }]}>{pillarIcon} {pillarTitle}</Text>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => handleContacts()}>   
                    <FontAwesome name="plus" size={28} color="purple" />
                </TouchableOpacity>
            ), 
        }}>

        </Stack.Screen>

      <View style={styles.container}>
        {hasSubPillars ? (
          parsedSubpillars.map((sub, index) => (
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
        <UserList pillarid={Array.isArray(pillarId) ? pillarId[0] : pillarId} />
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