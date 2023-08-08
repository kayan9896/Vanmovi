import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import Signup from './Signup'
import Login from './Login'

export default function Popup({vis,changevis}) {
    const [isSignup, setIsSignup] = React.useState(true)
  return (
    <Modal visible={vis} >
      <View style={{marginTop:40, alignItems:'center'}}>
      <Pressable onPress={()=>{changevis(false)}}><Text>close</Text></Pressable>
        <View style={{flexDirection:'row',borderColor:'grey',borderBottomWidth:2}}>
        <Pressable onPress={function(){setIsSignup(true)}} style={{margin:20}}><Text>Signup</Text></Pressable>
        <Pressable onPress={function(){setIsSignup(false)}} style={{margin:20}}><Text>Login</Text></Pressable>
        </View>
        {isSignup ? <Signup fail={changevis}/> : <Login fail={changevis}/>}
      </View>
    </Modal>
  )
}