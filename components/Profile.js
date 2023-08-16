import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import Login from '../components/Login';
import Signup from '../components/Signup';
import CommentinPro from './CommentinPro';
import Notification from './MovieNotification.js';

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);
  const [imageUri, setImageUri] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const fetchImageUri = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('@saved_image');
      if (savedUri) {
        setImageUri(savedUri);
      }
    } catch (e) {
      console.error("Failed to fetch image URI:", e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setLoggedIn(!!user);
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

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length) {
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
        <HeaderLeft title="Profile" />

        <Text style={styles.infoText}>Are you an existing user?</Text>
        <Pressable style={styles.button} onPress={openLoginModal}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Text style={styles.infoText}>Are you a new user?</Text>
        <Pressable style={[styles.button, { marginTop: 10 }]} onPress={openSignupModal}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        {showLoginModal && <Login fail={setShowLoginModal} />}
        {showSignupModal && <Signup fail={setShowSignupModal} />}
      </View>
    );
  }

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
      <Pressable style={styles.button} onPress={() => signOut(auth)}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
      <Notification />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addPortraitButton: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  },
  editDeleteButton: {
    width: '30%',
    marginTop: 20,
    marginHorizontal: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoText: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: 'gray',
  },
});
