import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function Login() {
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
          <Pressable><Text>Login</Text></Pressable>
        </View>
      )
}