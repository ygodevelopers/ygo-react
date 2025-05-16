import { Stack, useRouter, useSegments } from "expo-router";
import {useAuth, AuthContextProvider} from '@/context/authContext'
import { useEffect } from "react";
import { Slot } from "expo-router";
import { MenuProvider } from 'react-native-popup-menu';


const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    if(typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0]=='(app)';
    
    if(isAuthenticated && !inApp) {
      // redirect user to home
      router.replace('/(app)/(tabs)/pilliars')

    }
    else if (!isAuthenticated){
      // redirect to signin
      router.replace('/signIn')
    }

  }, [isAuthenticated])

  return <Slot />
}

export default function RootLayout() {
  return (
    <MenuProvider customStyles={{
      backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: 1,
      },
    }}>
      <AuthContextProvider>
        <MainLayout/>
      </AuthContextProvider>
    </MenuProvider>
    
  )
}
