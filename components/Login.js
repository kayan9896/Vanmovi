import { View, Text, Pressable,TextInput } from 'react-native'
import React from 'react'
import { auth } from '../firebase/setup.js'
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({fail}) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
    return (
        <View>
          <Text>Email</Text>
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
          <Pressable onPress={function(){
            async function login(){
              try{
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              alert('logged in successfully')
              }catch(e){alert(e)}
            }
            login();
            
            fail(false);
          }}><Text>Login</Text></Pressable>
        </View>
      )
}