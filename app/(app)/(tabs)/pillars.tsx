
import { PillarList } from '@/components/PillarList';
import { PillarContextProvider } from '@/context/pillarContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Pillars() {

  return (
    <PillarContextProvider>
          <PillarList />
    </PillarContextProvider>
  );
}