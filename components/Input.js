import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import {add,remove} from '../firebase/util.js'

export default function Input({mvname}) {
    const [text, setText] = React.useState('')
  return (
    <View>
        <Text>Leave your comment</Text>
      <TextInput placeholder="Comment" onChangeText={function(tx){setText(tx)}}/>
      <Pressable onPress={function(){
        add("comments",{cm:text,mv:mvname});
      }}><Text>Post</Text></Pressable>
    </View>
  )
}