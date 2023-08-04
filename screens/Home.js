import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Item from '../components/Item'

export default function Home() {
  const [data, setData] = React.useState([
    { id: 1, name: 'John  wick' },
    { id: 2, name: 'Jane law' },
  ])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={data} renderItem={(i)=>{return <Item info={i.item}/>}}/>
    </View>
    )
}