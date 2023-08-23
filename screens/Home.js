import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import React, { useEffect } from 'react';
import Item from '../components/Item';
import HeaderRight from '../components/HeaderRight';
import * as Notifications from "expo-notifications";

export default function Home({ navigation }) {
  const [data, setData] = React.useState([]);
  const API_KEY = '7216108a2b7fcfbae0574a6c892ba9e1'; //Just for test
  const genresMap = new Map(); 

  useEffect(function () {
    async function fetchGenres() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const json = await response.json();
        json.genres.forEach((genre) => genresMap.set(genre.id, genre.name));
      } catch (e) {
        console.log(e);
      }
    }

    async function fetchMovieDetails(movie) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
        const json = await response.json();
        return {
          name: movie.original_title,
          release_date: movie.release_date,
          genres: movie.genre_ids.map((id) => genresMap.get(id)).join(', '),
          runtime: json.runtime,
          poster_path: movie.poster_path,
          overview: json.overview,
        };
      } catch (e) {
        console.log(e);
      }
    }
    
    async function fetchData() {
      try {
        await fetchGenres();
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const json = await response.json();
        const detailsPromises = json.results.map(fetchMovieDetails);
        const detailedMovies = await Promise.all(detailsPromises);
        setData(detailedMovies);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  const getRandomMovieGenre = () => {
    const genres = ["Animation", "Action", "Adventure", "Comedy", "Romance", "Fantasy", "Family", "Horror"];
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
  }

  const handleTestNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status === 'granted') {
      const randomGenre = getRandomMovieGenre();
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Movie Recommendation',
          body: `Today is a good day for a ${randomGenre} movie!`,
        },
        trigger: null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderRight title="VanMovie" navigation={navigation} />
      <Text style={styles.title}>What's new!</Text>
      <Button title="NTFY: Movie Recommend" onPress={handleTestNotification} />
      <FlatList data={data} renderItem={(i) => { return <Item info={i.item} /> }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightyellow',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center', 
    color: '#333',
  },
});
