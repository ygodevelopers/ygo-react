import { useEffect } from "react";
import { 
    Animated,
    View, 
    StatusBar, 
    Text 
} from "react-native" 

import { SafeAreaView } from "react-native-safe-area-context"
import Title from './(app)/title'

export default function SplashScreen ()
{
    const translatey = new Animated.Value(0)
    const duration = 500

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translatey,{
                    toValue: 30,
                    duration: duration,
                    useNativeDriver: true
                }),
                Animated.timing(translatey,{
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true
                })
            ])
        ).start()
    }, [])


    return (
        <SafeAreaView
            style = {{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black'
            }}
        >
           
            <StatusBar barStyle='light-content' />
            <Animated.View style={[{ transform: [{translateY: translatey}] }]} >
                <Title text='YGO' color = 'white' />
            </Animated.View>
        </SafeAreaView>        
    );
}