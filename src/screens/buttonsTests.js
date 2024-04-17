// MyScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {registerUser,loginUser,registerNewUser,deleteUser,updateUser,updateUserAccountStatus} from "../services/api_authentication" // Import your functions
import { createExpense, deleteExpense, getExpenses, getOneExpense, updateExpense } from '../services/api_management'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ButtonsTestsScreen = ({ navigation }) => {

  const registerUser1 = () => {
    //navigation.navigate('SignUp')
    registerUser('pep','pepet','pep5@gmail.com','Aa$12345');
  };

  const loginUser2 = async () => {
    //loginUser('pepeo123@gmail.com','Aa$12345');
    await loginUser('pep@gmail.com','Aa$12345','web')    
  };
  const createExpense3 = async () => {  
    const date = new Date();  
    console.log(date)
    
    const newTime = date.toISOString().substring(11,19).toString();
    const newDate = date.toISOString().substring(0,10).toString();    
    createExpense({ title:'lalalala',description:'siisis',amount: 0.1, category: 'Food', creation_date: newDate,creation_time: newTime });    
  };
  const deleteExpense4 = async () => {
    deleteExpense('15a2af47-91ef-4c04-a998-ee799599d2c4');
  };
  const getExpenses5 = async () => {
    getExpenses({start_date:'2024-04-08',end_date:'',start_time:'',end_time:''});    
  };
  const getOneExpense6 = async () => {
    getOneExpense('fd69a97a-c1c2-4d81-b9e8-b0210d7cc478');        
  };
  const updateExpense7 = async () => {
    const date = new Date();
    const newTime = date.toISOString().substring(11,19).toString();
    const newDate = date.toISOString().substring(0,10).toString();    
    updateExpense({ title:'bebebe',description:'wiwiwi',amount: 0, category: 'aaaa', creation_date: newDate,creation_time: newTime },'0bf507a3-e52c-43a9-8c74-3ccb5575250c',await AsyncStorage.getItem('Token'));        
    
  };

  const newUserAdmin = async () => {
    registerNewUser({
      name:'pep2',
      last_name:'pep1',      
      password:'Aa$12345',
      email:'pepepe@gmail.com.com',
      is_staff: true,
      is_superuser: false})
  };

  const delUser = async () => {
    deleteUser('10');
  }

  const updateOneUser = async () => {
    updateUser({    
      first_name:'wawa',
      last_name:'mw112ras',            
      email:'pepad2323a22min@gmail.com',
      is_staff: false,
      is_superuser: false,
      is_active:false},'21')
  };

  const updateUserAccData = async () => {
    updateUserAccountStatus({is_active:true},21)
  }

  
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
      <TouchableOpacity style={styles.button} onPress={newUserAdmin}>
        <Text style={styles.buttonText}>Create new user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={delUser}>
        <Text style={styles.buttonText}>Delete user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={updateOneUser}>
        <Text style={styles.buttonText}>Update user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={updateUserAccData}>
        <Text style={styles.buttonText}>Update User status</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey', // set background color to white
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
