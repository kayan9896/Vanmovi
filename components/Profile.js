import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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

      if (!result.canceled && result.assets && result.assets.length) {
        setImageUri(result.assets[0].uri);
        saveImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setTimeout(() => {
      callback();
    }, 4000);
  
  };

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
      <HeaderLeft title="Detail" />
      <Text style={styles.emailText}>{auth.currentUser.email}</Text>
      {console.log(showuri)}
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />

          <View style={styles.buttonRow}>
            <Pressable style={styles.editDeleteButton} onPress={function(){deleteImage(()=>pickImage(fetchImageUri))
            // console.log(imagelink)
            // console.log(showuri)
            }}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.editDeleteButton} onPress={function(){
              deleteImage(fetchImageUri)
              }}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
          <Pressable style={styles.addPortraitButton} onPress={function(){pickImage(fetchImageUri);}}>
            <Text style={styles.buttonText}>Add Portrait</Text>
          </Pressable>
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
    alignItems: 'center',
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  editDeleteButton: {
    width: '30%',
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#888', 
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
  },
  emailText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  }
});