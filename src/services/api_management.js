

import axios from 'axios';

baseurl = 'https://easeapi.onrender.com/api/'

/*export const createExpense = async (amount,category,date) => {
    try {
        const expenseData = {
          amount: amount,
          category: category,
          date: date
        }
        console.log(expenseData);
        // Retrieve the authentication token from AsyncStorage
        const Token = await AsyncStorage.getItem('Token');

        // Define the API endpoint URL
        const apiUrl = baseurl+'management/expense/';
        //console.log(Token)
        // Set up the request headers with the authentication token
        const header = {
            'Authorization': 'Token '+Token,            
        };

        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, expenseData, { header });

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};

*/

export const createExpense = async (expenseData, token) => {
    try {
        const apiUrl = baseurl+'management/expense/';  // Adjust the URL as per your API endpoint

        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };

        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, expenseData, { headers });
        console.log(token)
        console.log('--------')
        console.log(expenseData)
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};