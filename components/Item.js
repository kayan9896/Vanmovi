import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Item({ info }) {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => { navigation.navigate('Detail', { info: info }) }}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${info.poster_path}` }}
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{info.name}</Text>
        <Text style={styles.releaseDate}>Release Year: {info.release_date && new Date(info.release_date).getFullYear()}</Text>
        <Text style={styles.genres} numberOfLines={1} ellipsizeMode="tail">Genres: {info.genres}</Text>
        <Text style={styles.runtime}>Runtime: {Math.floor(info.runtime / 60)}h {info.runtime % 60}m</Text>
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
});
