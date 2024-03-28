// MyScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {registerUser,loginUser} from "../services/api_authentication" // Import your functions
import { createExpense, deleteExpense, getExpenses, getOneExpense, updateExpense } from '../services/api_management'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ButtonsTestsScreen = ({ navigation }) => {

  const registerUser1 = () => {
    //navigation.navigate('SignUp')
    registerUser('pep','pepet','pep@gmail.com','Aa$12345');
  };

  const loginUser2 = () => {
    //loginUser('pepeo123@gmail.com','Aa$12345');
    loginUser('pep@gmail.com','Aa$12345',{OS:'web'});
  };
  const createExpense3 = async () => {  
    const date = new Date();  
    console.log(date)
    console.log(date.toISOString().substring(11,19).toString())
    const newDate = date.toISOString().substring(0,10).toString();    
    createExpense({ title:'lalalala',description:'siisis',amount: 100.2, category: 'Food', creation_date: newDate },await AsyncStorage.getItem('Token'));    
  };
  const deleteExpense4 = async () => {
    deleteExpense('15a2af47-91ef-4c04-a998-ee799599d2c4',await AsyncStorage.getItem('Token'));
  };
  const getExpenses5 = async () => {
    getExpenses({start_date:'',end_date:''},await AsyncStorage.getItem('Token'));
    //getExpenses({},await AsyncStorage.getItem('Token'));
  };
  const getOneExpense6 = async () => {
    getOneExpense('4e3344f4-9e37-47b2-aa2f-d88746ae7441',await AsyncStorage.getItem('Token'));        
  };
  const updateExpense7 = async () => {
    const date = new Date();
    const newDate = date.toISOString().substring(0,10).toString();    
    updateExpense({ title:'lalalala',description:'siisis',amount: 0, category: 'aaaa', creation_date: newDate },'4e3344f4-9e37-47b2-aa2f-d88746ae7441',await AsyncStorage.getItem('Token'));        
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={registerUser1}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginUser2}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createExpense3}>
        <Text style={styles.buttonText}>Create expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteExpense4}>
        <Text style={styles.buttonText}>Delete expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getExpenses5}>
        <Text style={styles.buttonText}>Get expenses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getOneExpense6}>
        <Text style={styles.buttonText}>Get ONE expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={updateExpense7}>
        <Text style={styles.buttonText}>Update expense</Text>
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
