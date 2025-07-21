import { Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from "@/context/authContext";


export default function SingUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const { register } = useAuth();


  // TODO: Need to confirm unique email address and handle it. 

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }

    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      null 
    );

    if (!response.success) {
      console.log("sign up error:", response.msg);
      Alert.alert("Error", response.msg); 
      return;
    }

    console.log("sign up user success:");
    
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{
          paddingTop: hp(7),
          paddingHorizontal: wp(5),
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View>
          <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/Login-background/Group6.png')} />
        </View>
      </View>

      <View style={{
        gap: hp(5),
        width: wp(90),
        alignSelf: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: hp(4),
          fontWeight: 'bold',
          letterSpacing: 1,
          textAlign: 'center',
        }}>
          Sign Up
        </Text>

        <View style={{ gap: 16 }}>

          <View style={{
            width: wp(90),
            height: hp(7),
            gap: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 16,
            paddingHorizontal: wp(4),
          }}>
            <Feather name="user" size={hp(2.7)} color="gray" />
            <TextInput style={{
              fontSize: hp(2),
              flex: 1,
              color: '#404040'
            }} placeholder="Username" placeholderTextColor={'gray'} onChangeText={value => usernameRef.current = value} />
          </View>

          <View style={{
            width: wp(90),
            height: hp(7),
            gap: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 16,
            paddingHorizontal: wp(4),
          }}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput style={{
              fontSize: hp(2),
              flex: 1,
              color: '#404040'
            }} placeholder="Email address" placeholderTextColor={'gray'} onChangeText={value => emailRef.current = value} />
          </View>

          <View style={{
            width: wp(90),
            height: hp(7),
            gap: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 16,
            paddingHorizontal: wp(4),
          }}>
            <Octicons name="lock" size={hp(2.7)} color="gray" />
            <TextInput style={{
              fontSize: hp(2),
              flex: 1,
              color: '#404040'
            }} placeholder="Password"
              secureTextEntry
              placeholderTextColor={'gray'}
              onChangeText={value => passwordRef.current = value} />
          </View>

          <View style={{
            width: wp(90),
            height: hp(7),
            gap: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 16,
            paddingHorizontal: wp(4),
          }}>
            <Feather name="image" size={hp(2.7)} color="gray" />
            <TextInput style={{
              fontSize: hp(2),
              flex: 1,
              color: '#404040'
            }} placeholder="Profile url" placeholderTextColor={'gray'} onChangeText={value => profileRef.current = value} />
          </View>

          <View>
            {
              loading ? (
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "center",
                }}>
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity onPress={handleRegister} style={{
                  backgroundColor: '#6366F1',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: "center",
                  height: hp(6.5),
                }}>
                  <Text style={{
                    fontSize: hp(2.7),
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: 1,


                  }}>Sign Up
                  </Text>
                </TouchableOpacity>
              )

            }

          </View>



          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: wp(90),

          }}>
            <Text style={{ width: wp(50), textAlign: 'center', fontSize: hp(1.8), fontWeight: '600', color: '#737373', }}>
              Already have an account?
            </Text>

            <Pressable onPress={() => router.push('/signIn')}>
              <Text style={{ width: wp(40), textAlign: 'center', fontSize: hp(1.8), fontWeight: '600', color: '#6366F1', }}>
                Sign in
              </Text>
            </Pressable>


          </View>

        </View>

      </View>

    </CustomKeyboardView>
  );
}