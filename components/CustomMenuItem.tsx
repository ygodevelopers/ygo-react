import { MenuOption } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Text, View } from 'react-native';

type props = {
    text: string, 
    action: Function, 
    value: any, 
    icon: any
}


export const MenuItem = ({text, action, value, icon} : props) => {
    return (
        <MenuOption style={{backgroundColor: 'white'}} onSelect={() => action(value)}>
            <View>
                <Text style={{fontSize: hp(1.7)}}>{text}</Text>
            </View>
        </MenuOption>
    )


}