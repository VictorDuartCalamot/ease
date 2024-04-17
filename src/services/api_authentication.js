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
      first_name: name,
      last_name:surname,
      email: email,
      password: password,
    });
    //console.log(response.data);        
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
      os: os
    });
    
    const {token} = response.data;
    // Store access token securely    
    await storeToken(token);
    console.log(response.data)   
    //console.log(response.data);
    return response.data;
    // Manejo de la respuesta del servidor
  } catch (error) {    
    console.error(error);
    // Manejo de errores
  }
}

export const registerNewUser = async (data) => {
  try {
    console.log(data);
    token = await AsyncStorage.getItem('Token')
    console.log(token);
    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
  };
    const response = await axios.post(baseurl+'superadmin/user/', data, {headers});
    //console.log(response.data);        
    // Manejo de la respuesta del servidor
    console.log(response.data);
  } catch (error) {    
    console.error(error);
    // Manejo de errores
  }
}

export const deleteUser = async (id) => {
  try{
    token = await AsyncStorage.getItem('Token')
    console.log(token);
    console.log(id)
    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
  };
  const response = await axios.delete(baseurl+'superadmin/user/'+id+'/', {headers});
    //console.log(response.data);        
    // Manejo de la respuesta del servidor
    console.log(response.data);
  } catch (error) {    
    console.error(error);
    // Manejo de errores
  }
}

export const updateUser = async (userData,id) => {
  try {
      const apiUrl = baseurl+'superadmin/user/';  // Adjust the URL as per your API endpoint
      token = await AsyncStorage.getItem('Token')
      // Set up request headers with the JWT token
      const headers = {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
      };
      console.log(token)
      console.log('--------')
      console.log(userData)
      // Make the POST request to create the expense
      const response = await axios.put(apiUrl+id+'/', userData, { headers });
     
      // Return the response data
      console.log(response.data);
      return response.data;
  } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error creating expense:', error);
      throw error;
  }
};


export const updateUserAccountStatus = async (userData,id) => {
  try {
      const apiUrl = baseurl+'superadmin/user/block/';  // Adjust the URL as per your API endpoint
      token = await AsyncStorage.getItem('Token')
      // Set up request headers with the JWT token
      const headers = {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
      };
      console.log(token)
      console.log('--------')
      console.log(userData)
      // Make the POST request to create the expense
      const response = await axios.put(apiUrl+id+'/', userData, { headers });
     
      // Return the response data
      console.log(response.data);
      return response.data;
  } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error creating expense:', error);
      throw error;
  }
};