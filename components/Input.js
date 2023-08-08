import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import {add,remove} from '../firebase/util.js'
import { auth } from '../firebase/setup.js';

export default function Input({mvname,loggedIn,changepop}) {
    const [text, setText] = React.useState('')
  return (
    <View style={{margin:20,padding:10,borderColor:'grey',borderBottomWidth:2}}>
      <Text>Leave your comment</Text>
      <TextInput placeholder="Comment" onChangeText={function(tx){setText(tx)}}>{text}</TextInput>
      <Pressable style={{backgroundColor:'blue',alignItems:'center',marginHorizontal:60}}
      onPress={function(){
        if(loggedIn){
          add("comments",{cm:text,mv:mvname,user:auth.currentUser.email});
          setText('')
          alert('comment added')
        }
        else{
          changepop(true)
        }
      }}><Text style={{color:'white'}}>Post</Text></Pressable>
    </View>
  )
}