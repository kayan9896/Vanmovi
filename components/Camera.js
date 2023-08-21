import React, { useEffect } from 'react';
import { Image, Pressable, View, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Camera({ showuri, deleteImage, pickImage, fetchImageUri, editImage, flag }) {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(false)
  }, [showuri, flag]);

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to make this work!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImageUri(result.uri);  // This will cause a re-render with the new image
      saveImageUri(result.uri);  // And this will save it using your firebase function
    }
  };
  
  

  return (
    <>
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {!loading ? (
              <>
                <Pressable onPress={() => { setLoading(true), editImage() }}>
                  <MaterialIcons name="edit" size={40} color="dodgerblue" />
                </Pressable>
                <View style={{ width: 20 }} />
                <Pressable onPress={() => { setLoading(true), deleteImage(fetchImageUri) }} style={{ marginLeft: 20 }}>
                  <MaterialIcons name="delete" size={40} color="dodgerblue" />
                </Pressable>
              </>
            ) : <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="turquoise" style={{ alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {!loading && (
              <>
                <Pressable style={{ marginRight: 20 }} onPress={() => { setLoading(true), pickImage(fetchImageUri) }}>
                  <MaterialIcons name="add-a-photo" size={40} color="dodgerblue" />
                </Pressable>
                <Pressable onPress={pickFromGallery}>
                  <FontAwesome name="picture-o" size={37} color="dodgerblue" />
                </Pressable>
              </>
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </>
      )}
    </>
  );
}
