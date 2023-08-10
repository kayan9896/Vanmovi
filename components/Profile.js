import { View, Text, Pressable, StyleSheet,FlatList } from 'react-native';
import React, { useEffect } from 'react';
import Popup from '../components/Popup';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import { db } from '../firebase/setup.js'


export default function Profile() {
  const [cms, setCms] = React.useState([]);
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
  useEffect(() => {
    if (loggedIn) {
      const dt = onSnapshot(query(collection(db, "comments"), where("user", '==', auth.currentUser.email)), q => {
      const puredt = q.empty ? [] : q.docs.map(doc => doc.data());
      setCms(puredt);
    })}else{const dt=()=>{}}
    return () => { dt() };
  }, []);
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <>
          <HeaderLeft title ="Detail" />
        </>
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
        <>
          <HeaderLeft title ="Detail" />
        </>
        <Text>{auth.currentUser.email}</Text>
        <Pressable style={styles.button} onPress={function () { signOut(auth); }}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
        <FlatList data={cms} renderItem={({ item }) => <CommentItem i={item} />}/>
      </View>
    );
  }
}

const CommentItem = ({ i }) => (
  <Text style={styles.commentText}>{i.cm} from {i.mv}</Text>
  
);

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
});