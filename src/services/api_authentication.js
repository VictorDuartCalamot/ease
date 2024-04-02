import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
baseurl = 'https://easeapi.onrender.com/api/'

// Function to store access token securely
const storeToken = async (Token) => {
  try {
    await AsyncStorage.setItem('Token', Token);
  } catch (error) {
    console.error('Error storing access token:', error);
    throw error;
  }
};

export const registerUser = async (name,surname,email,password) => {
  try {
    const response = await axios.post(baseurl+'users/register/', {
      name: name,
      last_name:surname,
      email: email,
      password: password,
    });
    console.log(response.data);
    // Manejo de la respuesta del servidor
  } catch (error) {
    console.error(error);
    // Manejo de errores
  }
}

export const loginUser = async (email,password,os) => {
  try {
    const response = await axios.post(baseurl+'users/login/', {
      username: email,
      password: password,
      OS: os
    });
    
    const {token} = response.data;
    // Store access token securely    
    await storeToken(token);
    console.log(token)   
    //console.log(response.data);
    return response.data;
    // Manejo de la respuesta del servidor
  } catch (error) {
    console.error(error);
    // Manejo de errores
  }
}

