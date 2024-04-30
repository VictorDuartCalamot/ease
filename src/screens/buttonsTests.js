// MyScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,ScrollView } from 'react-native';
import {registerUser,loginUser,registerNewUser,deleteUser,updateUser,updateUserAccountStatus,getOneUser,getusers, logout} from "../services/api_authentication" // Import your functions
import { getCategories, createCategory, createExpense, deleteExpense, getExpenses, getOneExpense, updateExpense, updateCategory, deleteCategory,getCategory,getSubCategories,getSubCategory,createSubCategory,deleteSubCategory,updateSubCategory,getIncomes,createIncome,deleteIncome,getOneIncome,updateIncome } from '../services/api_management'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ButtonsTestsScreen = ({ navigation }) => {

  const registerUser1 = () => {
    //navigation.navigate('SignUp')
    registerUser('pep','pepet','pep@gmail.com','Aa$12345');
  };

  const loginUser2 = async () => {
    //loginUser('pepeo123@gmail.com','Aa$12345');
    await loginUser('pep@gmail.com','Aa$12345','web')    
  };

  const logoutButton = async () => {
    await logout()
  }

  //Expenses
  const createExpense3 = async () => {  
    const date = new Date();  
    console.log(date)
    
    const newTime = date.toISOString().substring(11,19).toString();
    const newDate = date.toISOString().substring(0,10).toString(); 
    console.log(newTime + ' ' + newDate)   
    createExpense({ title:'111',description:'si22s',amount: 50, creation_date: newDate,creation_time: newTime,category:'e2191c44-28e7-43f8-8e96-ac6f425b8f1c',subcategory:'07629f06-b980-4b51-b0d6-7ee952f59fac'});    
  };
  const deleteExpense4 = async () => {
    deleteExpense('3f7a011b-40f1-4b49-83ab-14c3ddedde7e');
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
    updateExpense({ title:'222',description:'122',amount: 3, creation_date: newDate,creation_time: newTime,category:'e2191c44-28e7-43f8-8e96-ac6f425b8f1c',subCategory:'07629f06-b980-4b51-b0d6-7ee952f59fac' },'3f7a011b-40f1-4b49-83ab-14c3ddedde7e');        
    
  };

//Income
const createIncomeF = async () => {  
  const date = new Date();  
  console.log(date)
  
  const newTime = date.toISOString().substring(11,19).toString();
  const newDate = date.toISOString().substring(0,10).toString();    
  createIncome({title:'lalalala',description:'siisis',amount: 0.1, creation_date: newDate,creation_time: newTime,category:'e2191c44-28e7-43f8-8e96-ac6f425b8f1c',subcategory:'07629f06-b980-4b51-b0d6-7ee952f59fac'});    
};
const deleteIncomeF = async () => {
  deleteIncome('dbb5ac6b-1072-4253-8ab7-e6f0bc19f510');
};
const getIncomesF = async () => {
  getIncomes({start_date:'2024-04-08',end_date:'',start_time:'',end_time:''});    
};
const getOneIncomeF = async () => {
  getOneIncome('5335eba0-3d73-4cbc-8124-445d87138a55');        
};
const updateIncomeF = async () => {
  const date = new Date();
  const newTime = date.toISOString().substring(11,19).toString();
  const newDate = date.toISOString().substring(0,10).toString();    
  updateIncome({title:'bebebe',description:'wiwiwi',amount: 5, creation_date: newDate,creation_time: newTime,category:'e2191c44-28e7-43f8-8e96-ac6f425b8f1c',subCategory:'07629f06-b980-4b51-b0d6-7ee952f59fac'},'179b3e70-66e6-4de2-8c9b-70d119c99810');            
};
//Users

  const getUsersf = async () => {
    getusers()
  }
  const getOneUserf = async () => {
    getOneUser(2)
  }
  const newUserAdmin = async () => {
    registerNewUser({
      first_name:'pep2',
      last_name:'pep1',      
      password:'Aa$12345',
      email:'pepepe@gmail.com.com',
      is_staff: true,
      is_superuser: false})
  };

  const delUser = async () => {
    deleteUser(3);
  }

  const updateOneUser = async () => {
    updateUser({    
      first_name:'0000',
      last_name:'00000',            
      email:'pepad2323a22min@gmail.com',
      is_staff: false,
      is_superuser: false,
      is_active:true},'21')
  };

  const blockUser = async () => {
    updateUserAccountStatus({is_active:false},21)
  }
  //Categories
  const categorycreate = async () => {
    createCategory({name:'Transporte',description:'Transporte publico',type:'Transporte',hexColor:'#2930CC'})
  }
  const getAllCategories = async () => {
    getCategories()
  }

  const getOneCategory = async () => {
    getCategory('8f910f85-38d0-43bc-82c0-714371f92b73')
  }

  const delCategory = async () => {
    deleteCategory('e33b7557-9015-44c5-a1b0-a0032633cfc5')
  }
  const updtCategory = async () => {
    updateCategory({name:'1111',description:'11122',type:'000000',hexColor:'#ffffff'},'de059e38-d6f0-4f43-8ad6-19c1ed0e117e')
  }
//Subcategories
  const subcategorycreate = async () => {
    createSubCategory({name:'Combustible',description:'Combustible',hexColor:'#2930CC',category:'e2191c44-28e7-43f8-8e96-ac6f425b8f1c'})
  }
  const getAllsubCategories = async () => {
    getSubCategories()
  }

  const getOnesubCategory = async () => {
    getSubCategory('e6612cd7-dfdb-453e-8a45-b5f6e6b41d58')
  }

  const delsubCategory = async () => {
    deleteSubCategory('f9371856-3f71-42f9-b411-efa3dc85c2a3')
  }
  const updtsubCategory = async () => {
    updateSubCategory({name:'1111',description:'11122',type:'000000',hexColor:'#ffffff',category:''},'de059e38-d6f0-4f43-8ad6-19c1ed0e117e')
  }
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer } keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={registerUser1}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={loginUser2}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getUsersf}>
          <Text style={styles.buttonText}>Get Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getOneUserf}>
          <Text style={styles.buttonText}>Get One user</Text>
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
        <TouchableOpacity style={styles.button} onPress={blockUser}>
          <Text style={styles.buttonText}>Update User status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={getExpenses5}>
          <Text style={styles.buttonText}>Get expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getOneExpense6}>
          <Text style={styles.buttonText}>Get ONE expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={createExpense3}>
          <Text style={styles.buttonText}>Create expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteExpense4}>
          <Text style={styles.buttonText}>Delete expense</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.button} onPress={updateExpense7}>
          <Text style={styles.buttonText}>Update expense</Text>
        </TouchableOpacity>  

        <TouchableOpacity style={styles.button} onPress={getIncomesF}>
          <Text style={styles.buttonText}>Get Incomes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getOneIncomeF}>
          <Text style={styles.buttonText}>Get ONE Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={createIncomeF}>
          <Text style={styles.buttonText}>Create Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteIncomeF}>
          <Text style={styles.buttonText}>Delete Income</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.button} onPress={updateIncomeF}>
          <Text style={styles.buttonText}>Update Income</Text>
        </TouchableOpacity>    

        <TouchableOpacity style={styles.button} onPress={getAllCategories}>
          <Text style={styles.buttonText}>Get categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getOneCategory}>
          <Text style={styles.buttonText}>Get single category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={categorycreate}>
          <Text style={styles.buttonText}>Create new category</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.button} onPress={delCategory}>
          <Text style={styles.buttonText}>del category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updtCategory}>
          <Text style={styles.buttonText}>update category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={getAllsubCategories}>
          <Text style={styles.buttonText}>Get subcategories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getOnesubCategory}>
          <Text style={styles.buttonText}>Get single subcategory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={subcategorycreate}>
          <Text style={styles.buttonText}>Create new subcategory</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.button} onPress={delsubCategory}>
          <Text style={styles.buttonText}>del subcategory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updtsubCategory}>
          <Text style={styles.buttonText}>update subcategory</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    minHeight: '100%',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default ButtonsTestsScreen;
