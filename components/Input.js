import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import {add,remove} from '../firebase/util.js'

export default function Input({mvname}) {
    const [text, setText] = React.useState('')
  return (
    <View style={{margin:20,padding:10,borderColor:'grey',borderBottomWidth:2}}>
      <Text>Leave your comment</Text>
      <TextInput placeholder="Comment" onChangeText={function(tx){setText(tx)}}/>
      <Pressable style={{backgroundColor:'blue',alignItems:'center',marginHorizontal:60}}
      onPress={function(){
        
        add("comments",{cm:text,mv:mvname});
      }}><Text style={{color:'white'}}>Post</Text></Pressable>
    </View>
  )
}