import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Popup from '../components/Popup';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/setup.js';

export default function Profile() {
  const [loggedIn, setLoggedIn] = React.useState(auth.currentUser);
  const [pop, setPop] = React.useState(!loggedIn);
  useEffect(function () {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Popup vis={pop} changevis={setPop} />
        <Text>You are not logged in</Text>
        <Pressable style={styles.button} onPress={function () { setPop(true); }}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{auth.currentUser.email}</Text>
        <Pressable style={styles.button} onPress={function () { signOut(auth); }}>
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
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});