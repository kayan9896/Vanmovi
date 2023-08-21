import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const HeaderRight = ({ title, navigation, style }) => {
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
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={29} color="yellow" style={styles.iconStyle} /> 
        </Pressable>
      ),
    });
  }, [navigation]);

  return null;
};

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 20,
  },
});

export default HeaderRight;
