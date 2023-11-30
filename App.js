import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './firebase/firebaseConfig';

//Routes
import Home from './src/screens/Home';
import ResetPassword from './src/screens/ResetPassword';
import Login from './src/screens/loggin/Login';
import SignUp from './src/screens/loggin/SignUp';
import TestScreen from './src/screens/testscreen';

const Stack = createStackNavigator();

function App() {

  //If the user have been authenticated already, will go to the home screen.
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

  }

  useEffect(() => {
    const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subcriber;
  },[]);

  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{
          headerShown:false,
        }}
        />
        <Stack.Screen name="SignUp" component={SignUp}
          options={{
          headerShown:false,
        }}
        /> 
        <Stack.Screen name="ResetPassword" component={ResetPassword}
          options={{
          headerShown:false,
        }}
        /> 

      </Stack.Navigator>
    );
  }else {
    return(
      <Stack.Navigator>   
        <Stack.Screen name="Home" component={Home} options={{headerShown:false,}}/>
        <Stack.Screen name="TestScreen" component={TestScreen} options={{headerShown:false,}}/>
      </Stack.Navigator>   
  )}

  
  }
  export default () => {
    return (
      <NavigationContainer>
        <App />
      </NavigationContainer>

    )
  }    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
