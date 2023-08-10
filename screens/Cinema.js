import { View, Text } from 'react-native';
import React from 'react';
import HeaderRight from '../components/HeaderRight';


export default function Cinema({ navigation }) {
  return (
    <View>
      <HeaderRight title="Cinema" navigation={navigation} />
    </View>
  )
}