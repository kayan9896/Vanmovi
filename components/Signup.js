import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { auth } from '../firebase/setup.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ fail }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState('');

  const validateEmail = () => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if (reg.test(email) === true) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Invalid Email');
      return false;
    }
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setPhoneNumberError('Invalid Phone Number');
      return false;
    } else {
      setPhoneNumberError('');
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
        onBlur={validateEmail}
      />
      <Text style={{ color: 'red' }}>{emailError}</Text>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(newText) => setPhoneNumber(newText)}
        onBlur={validatePhoneNumber}
      />
      <Text style={{ color: 'red' }}>{phoneNumberError}</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(newText) => setConfirmPassword(newText)}
      />
      <Pressable
        style={styles.button}
        onPress={function () {
          if (password !== confirmPassword) {
            alert('Passwords do not match');
          }
          if(!validateEmail()){
            alert('Invalid Email');
          }
          if(!validatePhoneNumber()){
            alert('Invalid Phone Number');
          }
          if (validateEmail() && validatePhoneNumber()&& password === confirmPassword) {
            async function signup() {
              try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert('signed up successfully');
              } catch (e) {
                alert('Fail to sign up');
              }
            }
            signup();
            fail(false);
          }
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
    backgroundColor: 'dodgerblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
