import { PillarList } from '@/components/PillarList';
import { PillarDetail } from '@/components/PillarDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PillarStackParamList } from "@/types";

import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Pillars() {

  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={PillarList} />
      <Stack.Screen name="Detail" component={PillarDetail} />
    </Stack.Navigator>
  );
}