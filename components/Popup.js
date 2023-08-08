import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import Signup from './Signup'
import Login from './Login'

export default function Popup({vis}) {
    const [isSignup, setIsSignup] = React.useState(true)
  return (
    <Modal visible={vis}>
      <View>
        <Pressable onPress={function(){setIsSignup(true)}}><Text>Signup</Text></Pressable>
        <Pressable onPress={function(){setIsSignup(false)}}><Text>Login</Text></Pressable>
        {isSignup ? <Signup /> : <Login />}
      </View>
    </Modal>
  )
}