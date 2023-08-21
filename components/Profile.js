import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import Login from '../components/Login';
import Signup from '../components/Signup';
import CommentinPro from './CommentinPro';
import Notification from './MovieNotification.js';
import { ref, uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage';
import {add,update,remove,get,set} from '../firebase/util.js'
import { storage } from "../firebase/setup.js";
import Camera from './Camera';


export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);
  const [imageUri, setImageUri] = useState(null);
  const [showuri,setShowuri]=useState(null)
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

  const renderUserComments = () => {
    return (
      <View style={{ flex: 0.45 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 25, marginBottom: 10 }}>My Comments</Text>
        <CommentinPro />
      </View>
    );
  };

  async function fetchImageUri() {
      try {
        const dt = await get('users',auth.currentUser.uid);
        
        if (dt) {
          let imagelink=dt.image
          if(imagelink){
            const reference = ref(storage,imagelink);
            const downloadUri = await getDownloadURL(reference);
            setShowuri(downloadUri);
          }
        }else{
          setShowuri(null);
        }
      } catch (e) {
        console.error("Failed to fetch image URI:", e);
      }
    }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setLoggedIn(!!user);
    });
    
    if(loggedIn){
      console.log('login')
      fetchImageUri();
      console.log('login',showuri)
    }
    
  })

  const saveImageUri = async (uri) => {
    try {
      const response= await fetch(uri);
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const rf= ref(storage, `images/${imageName}`);
      const uploadTask = await uploadBytesResumable(rf, blob);
      let path=uploadTask.metadata.fullPath;
      set('users',{id:auth.currentUser.uid,image:path})
    } catch (e) {
      console.error("Failed to save image URI:", e);
    }
  };

  const pickImage = async (callback) => {
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
      if(result.canceled){return false}
      if (!result.canceled && result.assets && result.assets.length) {
        setImageUri(result.assets[0].uri);
        saveImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    if(callback){
    setTimeout(() => {
      callback();
    }, 4000);}
    return true;
  };

  const editImage = async () => {
    try {
      const dt = await get('users',auth.currentUser.uid);
      if(pickImage(fetchImageUri)){
        if (dt) {
          let imagelink=dt.image
          if(imagelink){
            const t = ref(storage,imagelink);
            setTimeout(() => {
              deleteObject(ref(storage, t._location.path_));}, 10000);
          }
        }
      }
    } catch (e) {
      console.error("Failed to edit image URI:", e);
    }
  }

  const deleteImage = async (callback) => {
    try {
      remove('users',auth.currentUser.uid)
      const t=ref(storage, showuri)
      //console.log(t._location.path_)
      deleteObject(ref(storage, t._location.path_));
      setTimeout(() => {
        setShowuri(null);
      }, 2000);
    } catch (e) {
      console.error("Failed to delete image URI:", e);
    }
    setTimeout(() => {
      callback();
    }, 2000);
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
      <HeaderLeft title="Profile" />
      <Pressable style={styles.signOutContainer} onPress={() => signOut(auth)}>
        <Entypo name="log-out" size={24} color="dodgerblue" />

      </Pressable>
      <Text style={styles.emailText}>{auth.currentUser.email}</Text>
      <Camera 
        showuri={showuri} 
        deleteImage={deleteImage} 
        pickImage={pickImage} 
        fetchImageUri={fetchImageUri} 
        editImage={editImage}
        styles={styles} 
      />

      {loggedIn && renderUserComments()}
      <Notification />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 20,
    backgroundColor: 'lightyellow',
  },
  button: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
    width: '25%',
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
  infoText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
  },
  emailText: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#555',
  },
  signOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',  
    marginRight: 2,  
  },
  signOutText: {
    color: 'dodgerblue',
    marginLeft: 5,  // Space between the icon and text
    fontSize: 16,
    fontWeight: 'bold',
  },
});