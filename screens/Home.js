import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Item from '../components/Item';
import HeaderRight from '../components/HeaderRight';
import * as Notifications from "expo-notifications";
import { auth } from '../firebase/setup'; 
import { add, remove, get, set } from '../firebase/util';
import Color from '../components/Color';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const API_KEY = '7216108a2b7fcfbae0574a6c892ba9e1';
  const genresMap = new Map();
  const [likedMovies, setLikedMovies] = useState(new Set());

  const toggleLike = async (movieID, movieName) => {
    const moviePath = `movies/${auth.currentUser.uid}/${movieID}`;
    if (likedMovies.has(movieID)) {
      console.log('Movie is liked. Attempting to remove...');

      setLikedMovies(prev => {
        prev.delete(movieID);
        return new Set([...prev]);
      });
      await remove(moviePath);
      console.log('Movie removed successfully');

    } else {
      console.log('Movie is not liked. Attempting to add...');
      setLikedMovies(prev => new Set([...prev, movieID]));
      await add(moviePath, { movieID: movieID, name: movieName });
      console.log('Movie added successfully');
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      const checkLikedMovies = async () => {
        const liked = new Set();
        const userMoviesData = await get("movies", auth.currentUser.uid);
        if (userMoviesData) {
          for (let movie in userMoviesData) {
            if (userMoviesData.hasOwnProperty(movie)) {
              liked.add(userMoviesData[movie].movieID);
            }
          }
          setLikedMovies(liked);
        }
      };
      checkLikedMovies();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const json = await response.json();
        json.genres.forEach((genre) => genresMap.set(genre.id, genre.name));
      } catch (e) {
        console.error(e);
      }
    }

    async function fetchMovieDetails(movie) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
        const json = await response.json();
        return {
          id: movie.id,
          name: movie.original_title,
          release_date: movie.release_date,
          genres: movie.genre_ids.map((id) => genresMap.get(id)).join(', '),
          runtime: json.runtime,
          poster_path: movie.poster_path,
          overview: json.overview,
          isLiked: likedMovies.has(movie.id)
        };
      } catch (e) {
        console.error(e);
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
        console.error(e);
      }
    }

    fetchData();
  }, [likedMovies]);

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
    <LinearGradient 
      colors={[Color.gradientStart, Color.gradientEnd, Color.gradientFinal]}
      style={styles.container}>
      <HeaderRight title="VanMovie" navigation={navigation} />
      <Text style={styles.title}>What's new!</Text>
      <Button title="NTFY: Movie Recommend" onPress={handleTestNotification} />
      <FlatList 
        data={data} 
        renderItem={(i) => <Item info={i.item} toggleLike={toggleLike} />} 
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
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
