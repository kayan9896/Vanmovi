import { View, Text ,Pressable} from 'react-native'
import React ,{useEffect} from 'react'
import Popup from '../components/Popup'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase/setup.js';

export default function Profile() {
  const [loggedIn, setLoggedIn] = React.useState(auth.currentUser)
  const [pop, setPop] = React.useState(!loggedIn)
  useEffect(function(){
    onAuthStateChanged(auth, function(user){
      if(user){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    })
  },[])
  if(!loggedIn){
    return (
      <View>
        <Popup vis={pop} changevis={setPop}/>
        <Text>You are not logged in</Text>
        <Pressable onPress={function(){setPop(true)}}><Text>Log In</Text></Pressable>
      </View>
    )
  }else{
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Pressable onPress={function(){{signOut(auth)}}}><Text>Sign Out</Text></Pressable>
    </View>
  )
}}