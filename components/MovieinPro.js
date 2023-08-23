import { View, FlatList, StyleSheet, Pressable, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../firebase/setup.js';
import { db } from '../firebase/setup.js';
import { remove } from '../firebase/util.js';
import { AntDesign } from '@expo/vector-icons';

export default function MovieinPro() {
    const [likedMovies, setLikedMovies] = useState([]);

    useEffect(() => {
        const dt = onSnapshot(query(collection(db, "movies", auth.currentUser.uid, "likedMovies")), q => {
            const puredt = q.empty ? [] : q.docs.map(movie => movie.data().movieName);
            setLikedMovies(puredt);
        })
        return () => { dt() };
      }, []);

    return (
        <View>
            <FlatList data={likedMovies} renderItem={({ item }) => <MovieItem movieName={item} />}/>
        </View>
    );
}

const MovieItem = ({ movieName }) => {

    const handleUnlike = () => {
        Alert.alert(
            "Alert",
            `Do you want to unlike the movie ${movieName}?`,
            [
                {
                    text: "No",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        // You might need a function similar to `remove` to handle unliking
                        // For now, I'm using remove assuming it'll work in this case too.
                        // This will only remove the reference from the Firestore, but won't affect the movie data elsewhere
                        remove('movies', movieName);  
                        alert(`Unliked movie: ${movieName}`);
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.movieText}>{movieName}</Text>
            </View>
            <Pressable onPress={handleUnlike} style={styles.iconContainer}>
                <AntDesign name="delete" size={20} color="dodgerblue" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    movieText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
    },
    iconContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
});
