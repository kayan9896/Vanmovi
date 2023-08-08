import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import Signup from './Signup'
import Login from './Login'

export default function Popup({vis}) {
    const [isSignup, setIsSignup] = React.useState(true)
    const [visible, setVisible] = React.useState(vis)
  return (
    <Modal visible={visible} >
      <View style={{marginTop:40, alignItems:'center'}}>
      <Pressable onPress={()=>{setVisible(false)}}><Text>close</Text></Pressable>
        <View style={{flexDirection:'row',borderColor:'grey',borderBottomWidth:2}}>
        <Pressable onPress={function(){setIsSignup(true)}} style={{margin:20}}><Text>Signup</Text></Pressable>
        <Pressable onPress={function(){setIsSignup(false)}} style={{margin:20}}><Text>Login</Text></Pressable>
        </View>
        {isSignup ? <Signup /> : <Login />}
      </View>
    </Modal>
  )
}