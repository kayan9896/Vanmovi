import { View, Text, Button } from 'react-native'
import React from 'react'
import {add,remove} from '../firebase/util.js'

export default function Detail({route}) {
  return (
    <View>
      <Text>{route.params.info.name}</Text>
      
      <Button title="Add" onPress={()=>{
        add({n:route.params.info});
      }}/>
    </View>
  )
}