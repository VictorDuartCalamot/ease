import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import signUp from '../screens/signUp';
import login from '../screens/login';
import ButtonsTests from '../screens/buttonsTests';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ButtonsTests} />
        <Stack.Screen name="SignUp" component={signUp} />
        <Stack.Screen name="Login" component={login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
