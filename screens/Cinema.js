import { View, Text,FlatList } from 'react-native';
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
      <FlatList data={cinemas} renderItem={function({item}){return<Text>{item.name} in {item.city}</Text>}}/>
    </View>
  )
}