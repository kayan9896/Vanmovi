import { View, Text } from 'react-native'
import React from 'react'
import Popup from '../components/Popup'

export default function Profile() {
  return (
    <View>
    <Popup vis={true}/>
      <Text>Profile</Text>
    </View>
  )
}