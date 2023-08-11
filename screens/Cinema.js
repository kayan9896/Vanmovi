import { View, Text,FlatList,StyleSheet,Image } from 'react-native';
import React,{useEffect} from 'react';
import HeaderRight from '../components/HeaderRight';
import MapView,{Marker} from 'react-native-maps'
import * as Location from 'expo-location';

export default function Cinema({ navigation }) {
  const [cinemas, setCinemas] = React.useState([]);
  const [loc, setLoc] = React.useState(null);
  async function valid() {
    const status = await Location.requestForegroundPermissionsAsync();
    return status==='granted'
  }
  useEffect(function () {
    async function getCinemas() {
      const response = await fetch('https://www.cineplex.com/api/v1/theatres?language=en-us&range=25&skip=0&take=1000')
      const json = await response.json()
      const puredt = json.data.map((c)=>{return {name:c.name,address:c.address1,city:c.city,latitude:c.latitude,longitude:c.longitude}})
      setCinemas(puredt)
    }
    getCinemas()
  },[])
  useEffect(function () {
    async function getLoc() {
      const pm = await valid()
      
        const location = await Location.getCurrentPositionAsync({});
        setLoc(location.coords)
      
    }
    getLoc()
  },[Location])
  return (
    <View style={{flex:1}}>
      <HeaderRight title="Cinemas" navigation={navigation} />
      {loc&&<MapView style={{width:400,height:300}} initialRegion={{latitude:loc.latitude,longitude:loc.longitude,latitudeDelta:0.0922,longitudeDelta:0.0421}}>
        <Marker coordinate={{latitude:loc.latitude,longitude:loc.longitude}} title="You are here" >
          <Image source={require('../images/star.png')} style={{width:25,height:25}}/>
          <Text>You</Text>
        </Marker>
        {cinemas.map((c)=>{return <Marker key={c.name} coordinate={{latitude:c.latitude,longitude:c.longitude}} title={c.name} description={c.address}/>})}
      </MapView>}
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