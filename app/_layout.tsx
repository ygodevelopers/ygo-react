import { Stack, useSegments } from "expo-router";
import {useAuth} from '@/context/authContext'

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
}


export default function RootLayout() {
  return <Stack />;
}
