

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
        console.error('Error getting expense:', error);
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
        console.error('Error getting expenses:', error);
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
        console.error('Error deleting expense:', error);
        throw error;
    }
};


export const updateExpense = async (expenseData,id) => {
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

export const createIncome = async (incomeData) => {
    try {
        const apiUrl = baseurl+'management/income/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(incomeData)
        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, incomeData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};



export const getOneIncome = async (id) => {
    try {
        const apiUrl = baseurl+'management/income/';  // Adjust the URL as per your API endpoint
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
        console.error('Error getting expense:', error);
        throw error;
    }
};

export const getIncomes = async (params) => {
    try {
        const apiUrl = baseurl+'management/income/';  // Adjust the URL as per your API endpoint
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
        console.error('Error getting expenses:', error);
        throw error;
    }
};

export const deleteIncome = async (id) => {
    try {
        const apiUrl = baseurl+'management/income/';  // Adjust the URL as per your API endpoint
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
        console.error('Error deleting expense:', error);
        throw error;
    }
};


export const updateIncome = async (incomeData,id) => {
    try {
        const apiUrl = baseurl+'management/income/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(incomeData)
        // Make the POST request to create the expense
        const response = await axios.put(apiUrl+id+'/', incomeData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating expense:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const apiUrl = baseurl+'management/category/';  // Adjust the URL as per your API endpoint
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
        const response = await axios.get(apiUrl,{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error getting categories:', error);
        throw error;
    }
};

export const getCategory = async (id) => {
    try {
        const apiUrl = baseurl+'management/category/';  // Adjust the URL as per your API endpoint
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
        const response = await axios.get(apiUrl+id+'/',{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error getting category:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const apiUrl = baseurl+'management/category/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(categoryData)
        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, categoryData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating category:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const apiUrl = baseurl+'management/category/';  // Adjust the URL as per your API endpoint
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
        const response = await axios.delete(apiUrl+id+'/',{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error deleting subcategory:', error);
        throw error;
    }
};

export const updateCategory = async (categoryData,id) => {
    try {
        const apiUrl = baseurl+'management/category/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(categoryData)
        // Make the POST request to create the expense
        const response = await axios.put(apiUrl+id+'/', categoryData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error updating category:', error);
        throw error;
    }
};




export const getSubCategories = async (params) => {
    try {
        const apiUrl = baseurl+'management/subcategory/';  // Adjust the URL as per your API endpoint
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
        console.error('Error getting subcategories:', error);
        throw error;
    }
};

export const getSubCategory = async (id) => {
    try {
        const apiUrl = baseurl+'management/subcategory/';  // Adjust the URL as per your API endpoint
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
        const response = await axios.get(apiUrl+id+'/',{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error getting single subcategory:', error);
        throw error;
    }
};

export const createSubCategory = async (subcategoryData) => {
    try {
        const apiUrl = baseurl+'management/subcategory/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(subcategoryData)
        // Make the POST request to create the expense
        const response = await axios.post(apiUrl, subcategoryData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error creating subcategory:', error);
        throw error;
    }
};

export const deleteSubCategory = async (id) => {
    try {
        const apiUrl = baseurl+'management/subcategory/';  // Adjust the URL as per your API endpoint
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
        const response = await axios.delete(apiUrl+id+'/',{headers});
        
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error deleting subcategory:', error);
        throw error;
    }
};

export const updateSubCategory = async (subcategoryData,id) => {
    try {
        const apiUrl = baseurl+'management/subcategory/';  // Adjust the URL as per your API endpoint
        token = await AsyncStorage.getItem('Token')
        // Set up request headers with the JWT token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(token)
        console.log('--------')
        console.log(subcategoryData)
        // Make the POST request to create the expense
        const response = await axios.put(apiUrl+id+'/', subcategoryData, { headers });
       
        // Return the response data
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error updating subcategory:', error);
        throw error;
    }
};