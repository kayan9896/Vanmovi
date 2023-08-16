import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
        <Pressable 
          style={({ pressed }) => [
            styles.profileButton,
            pressed ? styles.pressedProfileButton : {},
            style 
          ]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return null;
};

const styles = StyleSheet.create({
  profileButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 10, 
  },
  pressedProfileButton: {
    backgroundColor: '#ddd',
  },
  profileButtonText: {
    color: 'deepskyblue',
  },
});

export default HeaderRight;
