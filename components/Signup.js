import { View, Text, Pressable,TextInput } from 'react-native'
import React from 'react'
import { auth } from '../firebase/setup.js'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({fail}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
    return (
        <View>
          <Text >Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(newText) => setEmail(newText)}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(newText) => setPassword(newText)}
          />
          <Text>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(newText) => setConfirmPassword(newText)}
          />
          <Pressable onPress={function(){
            async function signup(){
              try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert('signed up successfully')
              }catch(e){alert(e)}
            }
            signup();
            
            fail(false);
          }}><Text>Signup</Text></Pressable>
        </View>
      )
}