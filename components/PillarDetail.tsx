import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PillarStackParamList } from '@/types';


type Props = NativeStackScreenProps<PillarStackParamList, 'Detail'>;

export const PillarDetail = ({ route }: Props) => {
// export default function PillarDetail({ route }:any) {
  const  pillar  = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{pillar.icon}</Text>
      <Text style={styles.title}>{pillar.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 60 },
  title: { fontSize: 24, marginTop: 12 },
});