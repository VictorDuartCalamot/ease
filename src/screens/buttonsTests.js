// MyScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {registerUser,loginUser} from "../services/api_authentication" // Import your functions
import { createExpense } from '../services/api_management'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ButtonsTestsScreen = ({ navigation }) => {

  const handleFunction1 = () => {
    //navigation.navigate('SignUp')
    registerUser('pepe123o','pepeo123@gmail.com','Aa$12345');
  };

  const handleFunction2 = () => {
    loginUser('pepeo123@gmail.com','Aa$12345');
  };
  const handleFunction3 = async () => {    
    const date= new Date();
    const isoString = date.toISOString();
    createExpense({amount: 127.2, category: 'ocio',date: isoString },await AsyncStorage.getItem('Token'));
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFunction1}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFunction2}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFunction3}>
        <Text style={styles.buttonText}>Create expense</Text>
      </TouchableOpacity>
      {/* Add more buttons as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // set background color to white
  },
  button: {
    backgroundColor: 'black', // set button background color to black
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // set button text color to white
    fontSize: 16,
  },
});

export default ButtonsTestsScreen;
