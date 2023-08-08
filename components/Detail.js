import { View, Text, Button, FlatList,ScrollView } from 'react-native'
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
    <View style={{alignItems:'stretch'}}>
      <Popup vis={true}/>
      <View style={{margin:20,padding:10,borderColor:'grey',borderBottomWidth:2}}>
        <Text >{route.params.info.name}</Text>
      </View>
      <Input mvname={route.params.info.name}/>
      <View>
        <Text style={{marginTop:10,alignSelf:'center'}}>Comments</Text>
        <FlatList data={cms} renderItem={(i)=>{return <Text style={{margin:10,alignSelf:'center'}}>{i.item.cm}</Text>}}/>
      </View>
    </View>
  )
}