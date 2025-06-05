import { useRouter, useSegments } from "expo-router";
import { useAuth, AuthContextProvider} from '@/context/authContext'
import { useEffect } from "react";
import { Slot } from "expo-router";
import { PillarContextProvider } from "@/context/pillarContext";



const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    if(typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0]=='(app)';
    
    if(isAuthenticated && !inApp) {
      // redirect user to home
      router.replace('/(app)/(tabs)/pillars')

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

        <AuthContextProvider>
          <PillarContextProvider>
            <MainLayout/>
          </PillarContextProvider>
        </AuthContextProvider>    

    )
}
