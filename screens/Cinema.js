import { View, Text,FlatList,StyleSheet } from 'react-native';
import React,{useEffect} from 'react';
import HeaderRight from '../components/HeaderRight';


export default function Cinema({ navigation }) {
  const [cinemas, setCinemas] = React.useState([]);
  useEffect(function () {
    async function getCinemas() {
      const response = await fetch('https://www.cineplex.com/api/v1/theatres?language=en-us&range=100&skip=0&take=1000')
      const json = await response.json()
      const puredt = json.data.map((c)=>{return {name:c.name,address:c.address1,city:c.city}})
      setCinemas(puredt)
    }
    getCinemas()
  },[])
  return (
    <View>
      <HeaderRight title="Cinemas" navigation={navigation} />
      <FlatList data={cinemas} renderItem={function({item}){return<CinemaItem i={item}/>}}/>
    </View>
  )
}

const CinemaItem = ({ i }) => (
  <View style={styles.commentText}>
    <Text>{i.name} in {i.city}</Text>
    <Text>{i.address}</Text>
  </View>
  
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
})