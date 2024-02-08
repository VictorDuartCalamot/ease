import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Routes
import Login from './screens/loginscreen';

const Stack = createStackNavigator();

function App() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login}
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>

  );
      };

  export default () => {
    return (
      <NavigationContainer>
        <App />
      </NavigationContainer>

    )
  };