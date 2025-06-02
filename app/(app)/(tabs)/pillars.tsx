import { Text, View } from "react-native";
import { PillarList } from '@/components/PillarList';
import { PillarContextProvider } from '@/context/pillarContext';
import { PillarDetail } from '@/components/PillarDetail'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PillarStackParamList } from "@/types";

const Stack = createNativeStackNavigator<PillarStackParamList>();

export default function Pillars() {

  return (
    <PillarContextProvider>
      {/* <NavigationContainer> */}
        <Stack.Navigator >
          <Stack.Screen name="Home" component={PillarList} />
          <Stack.Screen name="Detail" component={PillarDetail} />
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </PillarContextProvider>
  );
}