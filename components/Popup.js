import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Signup from './Signup';
import Login from './Login';

export default function Popup({ vis, changevis }) {
  const [isSignup, setIsSignup] = React.useState(true);
  return (
    <Modal visible={vis} >
      <View style={styles.container}>
        <Pressable onPress={() => { changevis(false); }} style={styles.closeButton}>
          <Text>close</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Pressable onPress={function () { setIsSignup(true); }} style={[styles.button, isSignup && styles.activeButton]}>
            <Text style={isSignup ? styles.activeText : styles.inactiveText}>Signup</Text>
          </Pressable>
          <Pressable onPress={function () { setIsSignup(false); }} style={[styles.button, !isSignup && styles.activeButton]}>
            <Text style={!isSignup ? styles.activeText : styles.inactiveText}>Login</Text>
          </Pressable>
        </View>
        {isSignup ? <Signup fail={changevis} /> : <Login fail={changevis} />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  button: {
    margin: 20,
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: 'dodgerblue',
  },
  activeText: {
    color: 'dodgerblue',
  },
  inactiveText: {
    color: 'grey',
  },
});
