import { Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from "@/context/authContext";
import CustomKeyboardView from '../components/CustomKeyboardView';



export default function SingIn() {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const { login, user } = useAuth();

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            console.log("need to fill out form?");
            return;
        }
        // TODO: add login
        const response = await login(emailRef.current, passwordRef.current);
        if (!response.success) {
            console.log("sign in error:", response.msg);
        }
        console.log("handleLogin user success: ", user);
    }

    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start', padding: 0, margin: 0, gap: hp(9), }}>
                <View style={{justifyContent: "flex-start", alignItems: "center",}}>
                    <View style={{ width: wp(100), height: hp(45), position: 'relative' }}>
                        <Image style={{ position: 'absolute', width: wp(100), height: hp(50), resizeMode: 'cover', zIndex: 0, }} source={require('../assets/images/Login-background/Group6.png')} />
                        <Image style={{ position: 'absolute', width: wp(100), height: hp(47), resizeMode: 'cover', zIndex: 1, }} source={require('../assets/images/Login-frontground/Group3.png')} />
                        <Image style={{ position: 'absolute', width: wp(40), height: hp(20), top: '40%', left: '55%', transform: [{ translateX: -wp(25) }, { translateY: -hp(10) }], resizeMode: 'contain', zIndex: 2, }} source={require('../assets/images/Login-ygo-logo/Vector.png')} />
                        <Image style={{ position: 'absolute', width: wp(40), height: hp(20), top: '75%', left: '55%', transform: [{ translateX: -wp(25) }, { translateY: -hp(10) }], resizeMode: 'contain', zIndex: 3, }} source={require('../assets/images/Login-ygo-text/Group1.png')} />
                    </View>
                </View>


                <View style={{gap: hp(5), width: '100%', alignItems: 'center', marginTop: hp(5),}}>
                    <View style={{ gap: 16 }}>
                        <View style={{ width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4),}}>
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040' }} placeholder="Email address" placeholderTextColor={'gray'} onChangeText={value => emailRef.current = value} autoCapitalize='none' />
                        </View>

                        <View style={{ gap: 12,}}>
                            <View style={{ width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4), }}>
                                <Octicons name="lock" size={hp(2.7)} color="gray" />
                                <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040'}} placeholder="Password" secureTextEntry  placeholderTextColor={'gray'}  onChangeText={value => passwordRef.current = value} autoCapitalize='none' />
                            </View>
                            <Text style={{  fontSize: hp(1.8),  fontWeight: 600,  color: '#737373', textAlign: 'right' }}>Forgot password?</Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleLogin} style={{  backgroundColor: '#6366F1',  borderRadius: 16,  justifyContent: 'center',  alignItems: "center", height: hp(6.5),}}>
                                <Text style={{ fontSize: hp(2.7), fontWeight: 700, color: '#ffffff', letterSpacing: 1, }}>Sign In </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{  flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', width: wp(90), }}>
                            <Text style={{ width: wp(45), textAlign: 'center', fontSize: hp(1.8), fontWeight: '600', color: '#737373', }}> Don't have an account? </Text>

                            <Pressable onPress={() => router.push('/signUp')}>
                                <Text style={{ width: wp(45), textAlign: 'center', fontSize: hp(1.8), fontWeight: '600', color: '#6366F1', }}> Sign Up </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView >
    );
}