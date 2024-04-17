

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
baseurl = 'https://easeapi.onrender.com/api/'


export const createExpense = async (expenseData) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(expenseData)
        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, expenseData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};


export const getOneExpense = async (id) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')        
        // Make the POST request to create the expense
        const response = await axios.get(apiUrl+id+'/',{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};

export const getExpenses = async (params) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        //console.log(token)
        //console.log('--------')
        //console.log(params)
        // Make the POST request to create the expense
        const response = await axios.get(apiUrl,{headers,params});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};

export const deleteExpense = async (id) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(id)
        // Make the POST request to create the expense
        const response = await axios.delete(apiUrl+id+'/', { headers });
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};


export const updateExpense = async (expenseData,id, token) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint

        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(expenseData)
        // Make the POST request to create the expense
        const response = await axios.put(apiUrl+id+'/', expenseData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};