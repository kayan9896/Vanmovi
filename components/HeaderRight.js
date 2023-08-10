import React, { useEffect } from 'react';
import { Button } from 'react-native';

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
    });
  }, [navigation]);

  return null;
};

export default HeaderRight;