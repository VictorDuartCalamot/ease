import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './firebase/firebaseConfig';
import { isAdmin,isSuperAdmin } from './src/utils/dbUtils';

//Routes
import Home from './src/screens/UserHomeScreen';
import ResetPassword from './src/screens/ResetPassword';
import Login from './src/screens/loggin/Login';
import SignUp from './src/screens/loggin/SignUp';
//import TestScreen from './src/screens/testscreen';
import AdminScreen from './src/screens/main/Home';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isAdminValue, setIsAdminValue] = useState(false);
  const [isSuperAdminValue, setIsSuperAdminValue] = useState(false);
  //const [accountCreated, setAccountCreated] = useState(false);
  //const [loading, setLoading] = useState(true); // New loading state

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    //setLoading(false); // Set loading to false when authentication state is determined
  }

  async function checkAdminStatus(userEmail) {
    const adminStatus = await isAdmin(userEmail);
    const superAdminStatus = await isSuperAdmin(userEmail);

    setIsAdminValue(adminStatus);
    setIsSuperAdminValue(superAdminStatus);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      checkAdminStatus(user.email);
    }
  }, [user]);

  /*useEffect(() => {
    if (accountCreated && !user) {
      navigation.navigate('Login');
    }
  }, [accountCreated, user]);
*/
  //if (initializing || loading) return null; // Show loading indicator while authentication state is being determined

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  } else {
    if (isAdminValue || isSuperAdminValue) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
    } else {
      //<Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
      return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
    }
  }
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
})