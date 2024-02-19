// LoginScreen.js
import React, { useState } from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Home from './homescreen';

const Stack = createStackNavigator(); 


const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function Home() {
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown:false
          }}
          />
        </Stack.Navigator>
  
    );
        };


  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, simplemente muestra las credenciales en la consola
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <ImageBackground source={require('../assets/fondo.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
            <View>
              <Image source={require('../assets/logo.png')} style={styles.logo}/>
            </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#fff"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#fff"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Añade un fondo oscuro semi-transparente para resaltar el formulario
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
logo: {
    width: 140,
    height: 140,
    marginBottom: 50,
    borderRadius: 50,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowOpacity: 0.25,
    shadowRadius: 4
},
});

export default LoginScreen;
