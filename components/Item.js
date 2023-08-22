import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import calendar from '../images/calendar.png';
import genre from '../images/genre.png';  
import time from '../images/time.png'; 
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase/setup';


export default function Item({ info, likedMovies, toggleLike }) {
  const navigation = useNavigation();
  const handleIconPress = () => {
    if (auth.currentUser) {
      toggleLike(info.id);
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => { navigation.navigate('Detail', { info: info }) }}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${info.poster_path}` }}
      />
      <View style={styles.details}>
      <AntDesign 
          name={info.isLiked ? "star" : "staro"} 
          size={24} 
          color={info.isLiked ? "yellow" : "gray"} 
          onPress={() => toggleLike(info.id)} 
          marginTop={2}
          marginBottom={2}
        />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{info.name}</Text>


        <View style={styles.row}>
          <Image source={calendar} style={styles.icon} />
          <Text style={styles.releaseDate}>Release Year: {info.release_date && new Date(info.release_date).getFullYear()}</Text>
        </View>

        <View style={styles.row}>
          <Image source={genre} style={styles.icon} />
          <Text style={styles.genres} numberOfLines={1} ellipsizeMode="tail">Genres: {info.genres}</Text>
        </View>

        <View style={styles.row}>
          <Image source={time} style={styles.icon} />
          <Text style={styles.runtime}>Runtime: {Math.floor(info.runtime / 60)}h {info.runtime % 60}m</Text>
        </View>

        <Text style={styles.overview} numberOfLines={3} ellipsizeMode="tail">Overview: {info.overview}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  releaseDate: {
    color: '#555',
    fontSize: 14,
  },
  genres: {
    color: '#555',
    fontSize: 14,
  },
  runtime: {
    color: '#555',
    fontSize: 14,
  },
  overview: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
});
