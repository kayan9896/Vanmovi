import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HeaderRight = ({ title, navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        backgroundColor: 'deepskyblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      ),
      // headerRight: function(){
      //   return <Pressable onPress={function(){
      //     navigation.navigate('Profile')}
      //   }><Text>Profile</Text></Pressable>
      // }
    });
  }, [navigation]);

  return null;
};

export default HeaderRight;