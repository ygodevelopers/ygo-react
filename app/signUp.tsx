import { Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from "@/context/authContext";
import type { User } from "@/types";

export default function SingUp() {


  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register } = useAuth();
  const isFormIncomplete = !email || !password || !firstName || !lastName;

  const isValidEmail = (email: string) => {
    const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex .test(email);
  };

  // TODO: Need to confirm unique email address and handle it. 

  const handleRegister = async () => {
    if (isFormIncomplete) {
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      setLoading(true);
      const response = await register(
        email,
        password,
        firstName,
        lastName,
        null
      );

      if (!response.success) {
        console.log("sign up error:", response.msg);
        Alert.alert("Error", response.msg);
        return;
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
      Alert.alert("Error", "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ flex: 1, backgroundColor: '#177673', }}>
        <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5), justifyContent: "flex-start", alignItems: "center", }}>
          <View>
            <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/Icono-white/Icono_white.png')} />
          </View>
        </View>

        <View style={{ gap: hp(5), width: wp(90), alignSelf: 'center', alignItems: 'center', }}>
          <View style={{ gap: 16 }}>
            <View style={{ width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4), }}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040' }} placeholder="Enter your email" placeholderTextColor={'gray'} onChangeText={setEmail} />
            </View>

            <View style={{ width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4), }}>
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040' }} placeholder="Enter your first name" placeholderTextColor={'gray'} onChangeText={setFirstName} />
            </View>

            <View style={{
              width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4),
            }}>
              <Feather name="users" size={hp(2.7)} color="gray" />
              <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040' }} placeholder="Enter your last name" placeholderTextColor={'gray'} onChangeText={setLastName} />
            </View>

            <View style={{ width: wp(90), height: hp(7), gap: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, paddingHorizontal: wp(4), }}>
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput style={{ fontSize: hp(2), flex: 1, color: '#404040' }} placeholder="Enter your password" secureTextEntry placeholderTextColor={'gray'} onChangeText={setPassword} />
            </View>

            <View>
              {
                loading ? (
                  <View style={{ flexDirection: 'row', justifyContent: "center", }}>
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{
                    backgroundColor: isFormIncomplete ? "#A5B4FC" : "#6366F1", borderRadius: 16, justifyContent: 'center', alignItems: "center", height: hp(6.5), opacity: isFormIncomplete ? 0.6 : 1,
                  }}>
                    <Text style={{ fontSize: hp(2.7), fontWeight: 700, color: '#ffffff', letterSpacing: 1, }}>Sign Up </Text>
                  </TouchableOpacity>
                )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', width: wp(90), marginTop: 5, }}>
              <Text style={{ width: wp(50), textAlign: 'center', fontSize: hp(1.8), fontWeight: '600', color: '#ffffff', }}>Already have an account?</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => router.push('/signIn')} style={{ backgroundColor: '#ffffff', borderRadius: 16, justifyContent: 'center', alignItems: "center", height: hp(6.5), }}>
                <Text style={{ fontSize: hp(2.7), fontWeight: 700, color: 'gray', letterSpacing: 1, }}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}