import { View, Text,Pressable } from 'react-native'
import React,{useEffect} from 'react'
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
    useEffect(function(){
        async function noti(){
            try{
                if(await validPermit()){
                    await Notifications.scheduleNotificationAsync({
                        content:{
                            title:'You have a new notification',
                            body:'Click to view'
                        },
                        trigger:{
                            weekday:4,
                            repeats:true,
                            hour:9,
                            minute:59,
                        }
                        
                    })
                }else{
                    alert('Please allow notification')
                }
    
            }catch(e){
              console.log(e);
            }
          }
          noti()
    },[])
  return (
    <View>
    </View>
  )
}