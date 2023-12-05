import * as React from 'react';
import { Alert, Settings, Text, View, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreens from '../settings/user_settings';
import AdminScreen1   from '../AdminScreen';
function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings-outline' : 'settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
            }
              else if (route.name === 'Admin') {
                iconName = focused ? 'shield-outline' : 'shield-outline';
           }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Admin" component={AdminScreen1} />
        <Tab.Screen name="Settings" component={SettingsScreens} />
        <Tab.Screen name="Profile" component={Profile} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}