import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pillar } from '@/types';

export const PillarDetail = ({ item }: { item: Pillar }) => {
  console.log("PillarDetail item: ", item);
  const hasSubPillars = item.subPillars && item.subPillars.length > 0;
  console.log("PillarDetail subpillars: ", hasSubPillars);
  return (
    <>
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
        <Text style={{ color: 'gray' }}>No Messages found</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24 },
  title: { fontSize: 24 },
});