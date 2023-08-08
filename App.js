import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Cinema from './screens/Cinema';
import Detail from './components/Detail';
import Profile from './components/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase/setup.js';
import { useEffect,useState } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(function(){
    onAuthStateChanged(auth, function(user){
      if(user){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    })
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={function({navigation}){
          return{headerRight: function(){
              return<Pressable onPress={function(){
                navigation.navigate('Profile')}
              }><Text>Profile</Text></Pressable>
            }
          }
        }}/>
        <Stack.Screen name="Cinema" component={Cinema}/>
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
