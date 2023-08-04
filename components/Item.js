import { View, Text } from 'react-native'
import React from 'react'

export default function Item({ info}) {
  return (
    <View style={{margin:10}}>
      <Text>{info.name}</Text>
    </View>
  )
}