import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { auth } from '../firebase/setup.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ fail }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <Pressable style={styles.button} onPress={function () {
        async function login() {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert('logged in successfully');
          } catch (e) { alert('Fail to login'+e.code); }
        }
        login();
        fail(false);
      }}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    alignSelf:'center',
    backgroundColor: 'dodgerblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '50%',
  },
  buttonText: {
    color: 'white',
  },
});
