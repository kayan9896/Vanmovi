import { View, Text, Button, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Input from './Input'
import { collection,onSnapshot,query, where } from 'firebase/firestore'
import { db } from '../firebase/setup.js'
import Popup from './Popup.js'

export default function Detail({route}) {
  const [cms, setCms] = React.useState([])
  const [pop, setPop] = React.useState(false)
  useEffect(function(){
    const dt=onSnapshot(query(collection(db,"comments"),where("mv",'==',route.params.info.name)),function(q){
      if(!q.empty){
        const puredt=q.docs.map(function(doc){return doc.data();})
        setCms(puredt);
      }else{setCms([]);}
    })
    return function(){dt()}
},[])
  return (
    <View style={{alignItems:'center'}}>
      <Text style={{margin:10,backgroundColor:'grey'}}>{route.params.info.name}</Text>
      <Popup vis={pop}/>
      <Input mvname={route.params.info.name}/>
      <FlatList data={cms} renderItem={(i)=>{return <Text style={{margin:10}}>{i.item.cm}</Text>}}/>
    </View>
  )
}