import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderLeft = ({ title }) => {
  const navigation = useNavigation();

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
      headerLeft: () => (
        <Button
          title="<-"
          onPress={() => navigation.goBack()}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
    },
    });
  }, [navigation]);

  return null;
};

export default HeaderLeft;
