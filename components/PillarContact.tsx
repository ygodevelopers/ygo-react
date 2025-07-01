import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from "expo-router";

export const PillarContact = ({setModalContact}:{setModalContact: (visible: boolean) => void}) => {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 }}>
        <TouchableOpacity onPress={() => setModalContact(false)}>
          <Text style={{
            fontSize: hp(1.8),
            letterSpacing: 1,
            textAlign: 'center',
          }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: hp(3),
          letterSpacing: 1,
          textAlign: 'center',
        }}>Contacts</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <View style={{flex: 1, width: '100%', alignItems: 'center' }}>
        <Text style={[styles.title]}>Actions</Text>

        <View style={styles.container} >
          <Text style={styles.icon}>🎎</Text>
          <Text style={styles.title}>New Group Chat</Text>
        </View>
        <View style={styles.container} >
          <Text style={styles.icon}>📁</Text>
          <Text style={styles.title}>New Sub-pillar</Text>
        </View>
        <TouchableOpacity onPress={() => {router.push('/AddContact')}}>  
          <View style={styles.container} >
            <Text style={styles.icon}>✉️</Text>
            <Text style={styles.title}>Add New Contact By Email</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, width: '100%', alignItems: 'center' }}>
        <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20 }]} >CONTACTS:</Text>
        <View style={styles.container} >
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.title}>Contact 1</Text> 
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
              flexDirection: 'row',
              padding: 10, 
              marginHorizontal: 10,
              marginVertical: 5, 
              width: 350,
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 12,
              gap: 8},
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});