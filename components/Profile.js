import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import CommentinPro from './CommentinPro';

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);
  const [imageUri, setImageUri] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deleteImage = () => {
    setImageUri(null);
  };

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <HeaderLeft title="Detail" />
        <Text>You are not logged in</Text>
        <Pressable style={styles.button} onPress={() => { setPop(true); }}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HeaderLeft title="Detail" />
        <Text>{auth.currentUser.email}</Text>

        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
            <Button title="Edit" onPress={pickImage} />
            <Button title="Delete" onPress={deleteImage} />
          </>
        ) : (
          <>
            <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
            <Button title="Add Portrait" onPress={pickImage} />
          </>
        )}
        <CommentinPro />
        <Pressable style={styles.button} onPress={() => { signOut(auth); }}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    width: '30%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },
  addPortraitButton: {
    width: '50%',
    alignSelf: 'center',
  },
  editDeleteButton: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 10,
  },


});
