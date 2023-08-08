import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Item from '../components/Item'

export default function Home() {
  const [data, setData] = React.useState([])
  useEffect(function () {
    async function fetchData() {
      try{
          const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=7216108a2b7fcfbae0574a6c892ba9e1')
          const json = await response.json()
          const dt=json.results.map(function(i){return {name:i.original_title,overview:i.overview}})
          setData(dt)
        }catch(e){console.log(e)}
    }
    fetchData()
  },[])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={data} renderItem={(i)=>{return <Item info={i.item}/>}}/>
    </View>
    )
}