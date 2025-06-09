import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useRouter} from 'expo-router';
import { useState } from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function AddContact()  {
    const router = useRouter();

    const [email, onChangeEmail] = useState<string>();


    const verifyEmail = () => {
    if (!email) {
        alert("Please enter an email address");
        return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(email)){
        return true;
    } else {
        alert("Please enter a valid email");
        return false;
    }
}


    const handleSearch = () => {
        if(verifyEmail()) {
            router.push({pathname: '/(app)/ConfirmContact', params: {email: email}})
        }
    }


    return (
        <CustomKeyboardView>
            <View className='flex-1 flex-col justify-center items-center'>
                <TextInput onChangeText={onChangeEmail} style={styles.input}/>
                <Button title='Search' onPress={handleSearch}/>
            </View>
        </CustomKeyboardView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});