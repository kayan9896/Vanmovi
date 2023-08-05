import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Item({ info}) {
  const navigation=useNavigation()
  return (
    <Pressable style={{margin:10}} onPress={function(){navigation.navigate('Detail',{info:info})}}>
      <Text>{info.name}</Text>
    </Pressable>
  )
}