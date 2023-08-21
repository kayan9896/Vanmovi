import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Camera({ showuri, deleteImage, pickImage, fetchImageUri, editImage }) {
  return (
    <>
      {console.log(showuri)}
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Pressable onPress={() => editImage()}>
              <MaterialIcons name="edit" size={24} color="dodgerblue" />
            </Pressable>
            <Pressable onPress={() => deleteImage(fetchImageUri)} style={{ marginLeft: 20 }}>
              <MaterialIcons name="delete" size={24} color="dodgerblue" />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
          <Pressable style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => pickImage(fetchImageUri)}>
            <MaterialIcons name="add-a-photo" size={24} color="dodgerblue" />
          </Pressable>
        </>
      )}
    </>
  );
}
