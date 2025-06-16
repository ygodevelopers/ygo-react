import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const PillarContact = ({setModalContact}:{setModalContact: (visible: boolean) => void}) => {


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
        <View style={{ width: 50 }} /> {/* Spacer to balance 'Cancel' button */}
      </View>
      
      <View>
        <Text style={[styles.title, { alignSelf: 'flex-start',marginLeft:20  }]}>Actions</Text>
        <View style={styles.container} >
          <Text style={styles.icon}>🎎</Text>
          <Text style={styles.title}>New Group Chat</Text>
        </View>
        <View style={styles.container} >
          <Text style={styles.icon}>📁</Text>
          <Text style={styles.title}>New Sub-pillar</Text>
        </View>
        <View style={styles.container} >
          <Text style={styles.icon}>✉️</Text>
          <Text style={styles.title}>Add New Contact By Email</Text>
        </View>
      </View>
      <View>
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
              width: 500,
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 12,
              gap: 8},
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});