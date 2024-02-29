import { Style, Text, View, StyleSheet,ImageBackground,TextInput,Image} from 'react-native'
import React, {useState} from 'react'
import Mybutton from '../components/Mybutton'

const getUnmetPasswordRequirements = (password) => {
  const requirements = [];
  if (!/\d/.test(password)) {
    requirements.push('at least one number');
  }
  if (!/[A-Z]/.test(password)) {
    requirements.push('at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    requirements.push('at least one lowercase letter');
  }
  if (!/[$;._\-*]/.test(password)) {
    requirements.push('at least one of the following symbols: $ ; . _ - *');
  }
  if (!/^.{8,}$/.test(password)) {
    requirements.push('at least 8 characters')
  }
  return requirements;
};


const registerscreen = () => {
  const [username, setUsername] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRegister = () => {
    // You can perform any registration logic here, such as calling an API
    console.log('Registering...');
    console.log('Username:', username);
    console.log('LastName', LastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('confirm your password:', confirmPassword);


    // You can add axios or any other API call here to register the user
  };
  return(
    <View style={styles.container}>
      <ImageBackground source={require("../assets/verde1.jpg")}
            style={styles.ImageBackground}>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/logo.png")}
          style={styles.ImageLogo}>
        </Image>
        <TextInput placeholder="First Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
          />
        <View style={styles.border}/>
        <TextInput placeholder="Last Name"
          value={username}
          onChangeText={(text) => setLastName(text)}
          />
        <View style={styles.border}/>


        <TextInput placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"     
          />
          <View style={styles.border}/>
          <TextInput placeholder ="Password" 
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordRequirementsMessage('');
          }}
          
          />
          <View style={styles.border}/>
          <TextInput placeholder ="confirm your password" 
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}/>
          <View style={styles.border}/>
          
          <Mybutton title={handleRegister}/>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  ImageBackground:{
    height:"100%",
    paddingHorizontal: 20,
    alignItems:'center'
  },
  inputContainer:{
    height: 450,
    width:"100%",
    backgroundColor:"white",
    borderRadius:20,
    justifyContent:"center",
    marginTop: 170,
    paddingHorizontal:25,

  },
  title:{
    fontSize:40,
    color:"white"
  },
  border:{
    width:"100%",
    backgroundColor:"gray",
    height:1,
    alignSelf:"center",
  },
  ImageLogo:{
    width:100,
    height:100,
    alignSelf:"center",
    borderRadius:30,
    marginBottom:20,
  }
});

export default registerscreen;