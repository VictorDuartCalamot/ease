import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../../utils/authUtils'; // Update the path as needed
import { isPasswordValid,isEmailAlreadyRegistered } from '../../utils/validationUtils'; // Update the path as needed

const SignUP = () => {
  const [username, setUserName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRequirementsMessage, setPasswordRequirementsMessage] = useState('');
  const [emailAlreadyRegisteredMessage, setEmailAlreadyRegisteredMessage] = useState('');

  const handleRegister = async () => {
    setEmailAlreadyRegisteredMessage(''); // Reset the email already registered message
    setPasswordRequirementsMessage(''); // Reset the password requirements message

    // Check if email is already registered here
    if (await isEmailAlreadyRegistered(email)) {
      setEmailAlreadyRegisteredMessage('Email is already registered. Please use a different email address.');
      return;
    }

    if (!isPasswordValid(password)) {
      const requirements = getUnmetPasswordRequirements(password);
      setPasswordRequirementsMessage(`Password requirements: ${requirements.join(', ')}`);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordRequirementsMessage('Passwords do not match. Please make sure your passwords match.');
      return;
    }    

    try {
      await registerUser(username, surname, email, password, confirmPassword);
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  //Password requirements system that checks if the password contains the minimum requirements and 
  const getUnmetPasswordRequirements = (password) => {
    const requirements = [];
    if (!/\d/.test(password)) {
      requirements.push('at least one number');
    }
    if (!/[A-Z]/.test(password)) {
      requirements.push('at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      requirements.push('at least one lowercase letter');
    }
    if (!/[$;._\-*]/.test(password)) {
      requirements.push('at least one of the following symbols: $ ; . _ - *');
    }
    return requirements;
  };

  return (
    <View style={styles.main_style}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <View style={styles.login_box}>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Username"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Surname"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setSurname(text)}
          />
        </View>        
        <View style={styles.textBox}>
          <TextInput
            placeholder="Email@gmail.com"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Password"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordRequirementsMessage('');
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Confirm Password"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.mainButton}>
          <TouchableOpacity style={styles.button_box} onPress={handleRegister}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {passwordRequirementsMessage ? (
          <Text style={styles.passwordRequirementsMessage}>{passwordRequirementsMessage}</Text>
        ) : null}
        {emailAlreadyRegisteredMessage ? (
          <Text style={styles.emailAlreadyRegisteredMessage}>{emailAlreadyRegisteredMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default SignUP;

const styles = StyleSheet.create({
  main_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
    borderRadius: 50,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  login_box: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textBox: {
    paddingVertical: 20,
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginVertical: 10,
  },
  mainButton: {
    alignItems: 'center',
  },
  button_box: {
    backgroundColor: '#525FE1',
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  signUpTxt: {
    marginTop: 20,
    textAlign: 'center',
  },
  passwordRequirementsMessage: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  emailAlreadyRegisteredMessage: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});
