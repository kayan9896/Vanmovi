import { View, Text,Pressable } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({handleNotification:async()=>({shouldShowAlert:true,shouldPlaySound:true,shouldSetBadge:true})})
export default function Notification() {
    async function validPermit(){
        const {status}=await Notifications.getPermissionsAsync()
        if(status!='granted'){
            const {status}=await Notifications.requestPermissionsAsync()
            if(status!='granted'){
                alert('Please allow notification')
                return false
            }
            return true
        }
        return true
    }
  return (
    <View>
      <Pressable style={{backgroundColor:'pink',alignSelf:'center',padding:10,margin:10}} onPress={async function(){
        try{
            if(await validPermit()){
                await Notifications.scheduleNotificationAsync({
                    content:{
                        title:'You have a new notification',
                        body:'Click to view'
                    },
                    trigger:{
                        seconds:5
                    },
                    date:new Date(Date.now()+5000)
                })
            }else{
                alert('Please allow notification')
            }

        }catch(e){
          console.log(e);
        }
      }}><Text>Notification</Text></Pressable>
    </View>
  )
}