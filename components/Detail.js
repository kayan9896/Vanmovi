import { View, Text, Button } from 'react-native'
import React from 'react'
import Input from './Input'


export default function Detail({route}) {
  return (
    <View>
      <Text>{route.params.info.name}</Text>
      
      <Input/>
    </View>
  )
}