import { Style, Text, View, StyleSheet,ImageBackground,TextInput,Image} from 'react-native'
import React from 'react'
import Mybutton from '../components/Mybutton'




const Register = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <ImageBackground source={require("../assets/verde1.jpg")}
            style={styles.ImageBackground}>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/logo.png")}
          style={styles.ImageLogo}>
        </Image>
          <TextInput placeholder="Enter Email or username"/>
          <View style={styles.border}/>
          <TextInput placeholder ="Password" secureTextEntry/>
          <View style={styles.border}/>
          <TextInput placeholder ="Repite tu Password" secureTextEntry/>
          <View style={styles.border}/>
          
          <Mybutton title={"Login"}/>
      </View>
      </ImageBackground>
    </View>
  );
};

export default Register;

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
})