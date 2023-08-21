import React from 'react';
import { Image, Pressable, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Camera({ showuri, deleteImage, pickImage, fetchImageUri, styles }) {
  return (
    <>
      {console.log(showuri)}
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />

          <View style={styles.buttonRow}>
            <Pressable style={styles.editDeleteButton} onPress={() => deleteImage(() => pickImage(fetchImageUri))}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.editDeleteButton} onPress={() => deleteImage(fetchImageUri)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="deepskyblue" style={{ alignSelf: 'center' }} />
          <Pressable style={styles.addPortraitButton} onPress={() => pickImage(fetchImageUri)}>
            <Text style={styles.buttonText}>Add Portrait</Text>
          </Pressable>
        </>
      )}
    </>
  );
}
