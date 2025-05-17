import { View, Text } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'
import { Platform } from 'react-native'

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({children}) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style= {{
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            
         }}
    >
        <ScrollView
            contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',   
          paddingHorizontal: 20,  
        }}
        style={{
          width: '100%',      
        }}
            bounces={false}
            showsVerticalScrollIndicator = {false}
             keyboardShouldPersistTaps="handled"
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}