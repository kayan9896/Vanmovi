import { View, Text,FlatList,StyleSheet,Pressable } from 'react-native'
import React,{useEffect} from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth } from '../firebase/setup.js';
import { db } from '../firebase/setup.js'
import { remove } from '../firebase/util.js';

export default function CommentinPro() {
    const [cm, setCm] = React.useState([]);
    useEffect(() => {
        const dt = onSnapshot(query(collection(db, "comments"), where("user", '==', auth.currentUser.uid)), q => {
            const puredt = q.empty ? [] : q.docs.map(function(i){return {...i.data(), id: i.id}});
            setCm(puredt);
        })
        return () => { dt() };
      }, []);
  return (
    <View>
       <FlatList data={cm} renderItem={({ item }) => <CommentItem i={item} />}/>
    </View>
  )
}

const CommentItem = ({ i }) => (
    <View>
    <Pressable onPress={function () {
        remove('comments', i.id)
        alert('comment deleted');
        }   
    }>
        <Text>X</Text>
    </Pressable>
    <Text style={styles.commentText}>{i.cm} from {i.mv}</Text>
    </View>
  );
  const styles = StyleSheet.create({
    commentText: {
      fontSize: 16,
      color: '#444',
      marginBottom: 10,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 5,
    }
  })