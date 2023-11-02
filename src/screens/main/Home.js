import { Text, StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import SettingsScreen from '../settings/user_settings';
  
  const Drawer = createDrawerNavigator();

function HomeScreen() {
  <view>
    hola
  </view>
}

export default function Home() {
    return(
        <NavigationContainer independent={true}>
          <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={HomeScreen} />          
            <Drawer.Screen name="Settings" component={SettingsScreen} />        
          </Drawer.Navigator>  
    </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    mainStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC'
    },

})