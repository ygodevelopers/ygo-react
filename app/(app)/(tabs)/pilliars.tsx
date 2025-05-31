import { Text, View } from "react-native";
import { PillarList } from '@/components/PillarList';
import { PillarContextProvider } from '@/context/pillarContext';
import { UserList } from '@/components/UserList'

export default function Pillars() {

  return (
    <PillarContextProvider>
      <PillarList />
    </PillarContextProvider>
  );
}