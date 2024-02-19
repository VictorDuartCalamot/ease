import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Routes
import Login from './screens/loginscreen';
import Home from './screens/homescreen';

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>

  );
      };

  export default App;