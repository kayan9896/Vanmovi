import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Input from './Input'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/setup.js'
import Popup from './Popup.js'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/setup.js';

export default function Detail({ route }) {
  const [cms, setCms] = React.useState([])
  const [pop, setPop] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setLoggedIn(!!user);
    });
  }, []);

  useEffect(() => {
    const dt = onSnapshot(query(collection(db, "comments"), where("mv", '==', route.params.info.name)), q => {
      const puredt = q.empty ? [] : q.docs.map(doc => doc.data());
      setCms(puredt);
    });
    return () => { dt() };
  }, []);

  return (
    <View style={styles.container}>
      <Popup vis={pop} changevis={setPop} />
      <FlatList
        data={cms}
        ListHeaderComponent={() => (
          <>
            <Image
              style={styles.poster}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${route.params.info.poster_path}` }}
            />
            <View style={styles.details}>
              <Text style={styles.title}>{route.params.info.name}</Text>
              <Text style={styles.overview}>{route.params.info.overview}</Text>
              <Input mvname={route.params.info.name} loggedIn={loggedIn} changepop={setPop} />
            </View>
            <CommentSection />
          </>
        )}
        renderItem={({ item }) => <CommentItem comment={item.cm} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const CommentSection = () => (
  <View style={styles.comments}>
    <Text style={styles.commentsTitle}>Comments:</Text>
  </View>
);

const CommentItem = ({ comment }) => (
  <Text style={styles.commentText}>{comment}</Text>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  poster: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  comments: {
    padding: 20,
    backgroundColor: '#fff',
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
  },
});
