import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import CommentinPro from './CommentinPro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);
  const [imageUri, setImageUri] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const fetchImageUri = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('@saved_image');
      if (savedUri !== null) {
        setImageUri(savedUri);
      }
    } catch (e) {
      console.error("Failed to fetch image URI:", e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    fetchImageUri();
  }, []);
  
  const saveImageUri = async (uri) => {
    try {
      await AsyncStorage.setItem('@saved_image', uri);
    } catch (e) {
      console.error("Failed to save image URI:", e);
    }
  };

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
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        saveImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deleteImage = async () => {
    setImageUri(null);
    try {
      await AsyncStorage.removeItem('@saved_image');
    } catch (e) {
      console.error("Failed to delete image URI:", e);
    }
  };
  
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <HeaderLeft title="Detail" />
        <Text>You are not logged in</Text>
        
        <Text style={styles.infoText}>Are you an existing user?</Text>
        <Pressable style={styles.button} onPress={() => { setShowLoginModal(true); }}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        
        <Text style={styles.infoText}>Are you a new user?</Text>
        <Pressable style={[styles.button, { marginTop: 10 }]} onPress={() => { setShowSignupModal(true); }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        
        {showLoginModal && <Login fail={setShowLoginModal} />}
        {showSignupModal && <Signup fail={setShowSignupModal} />}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HeaderLeft title="Detail" />
        <Text>{auth.currentUser.email}</Text>

        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            
            <View style={styles.buttonRow}>
              <View style={styles.editDeleteButton}>
                <Button title="Edit" onPress={pickImage} />
              </View>
              <View style={styles.editDeleteButton}>
                <Button title="Delete" onPress={deleteImage} />
              </View>
            </View>

          </>
        ) : (
          <>
            <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
            <View style={styles.addPortraitButton}>
              <Button title="Add Portrait" onPress={pickImage} />
            </View>
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
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  editDeleteButton: {
    width: '20%',
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  infoText: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
});