import React, { useEffect } from 'react';
import { Image, Pressable, View,ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Camera({ showuri, deleteImage, pickImage, fetchImageUri, editImage,flag }) {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(false)
  },[showuri,flag])
  return (
    <>
      {console.log(showuri)}
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {!loading?<Pressable onPress={() =>{setLoading(true), editImage()}}>
              <MaterialIcons name="edit" size={40} color="dodgerblue" />
            </Pressable>:<ActivityIndicator size="large" color="#0000ff" />}
            <View style={{ width: 20 }} />
            {!loading?<Pressable onPress={() =>{setLoading(true), deleteImage(fetchImageUri)}} style={{ marginLeft: 20 }}>
              <MaterialIcons name="delete" size={40} color="dodgerblue" />
            </Pressable>:<ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
          {!loading?<Pressable style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => {setLoading(true),pickImage(fetchImageUri)}}>
            <MaterialIcons name="add-a-photo" size={40} color="dodgerblue" />
          </Pressable>:<ActivityIndicator size="large" color="#0000ff" />}
        </>
      )}
    </>
  );
}
