import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, {useState} from 'react';

//Firebase auth
import firebaseApp from '../../../firebase/firebaseConfig';
import {firebaseAuth} from '../../../firebase/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {BlockUnblockUser,LoginHistoryRegistry, isAccBlocked,getUserDocIdWithEmail} from '../../utils/authUtils';
import {isEmailAlreadyRegistered} from '../../utils/validationUtils';



export default function Login(props) {

    //Create status variable
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isEmailBlank, setIsEmailBlank] = useState();
    const [blockAccCounter, setBlockAccCounter] = useState(1);
    const [blockedAccMsg,setBlockedAccMsg] = useState();    
    //Ruta para acceder a la pantalla de Home
    
    const loginUser = async() => {                 
        setIsEmailBlank('');
        setBlockedAccMsg('');         
        if (await isEmailAlreadyRegistered(email)){            
            if(!await isAccBlocked(email)){
                try {
                    await signInWithEmailAndPassword(firebaseAuth, email, password)
                    Alert.alert('Sesion Iniciada')
                    LoginHistoryRegistry(email,true)                                                    
                } catch (error) {
                    setIsEmailBlank('Email or password incorrect, please try again.')  
                    console.log(error);                
                    LoginHistoryRegistry(email,false,'Incorrect password.')
                    //Gets the previous state of the BlockAccCounter and increments it +1 
                    setBlockAccCounter((prevCounter) => prevCounter + 1); 
                    console.log("Counter: "+blockAccCounter);
                    if (blockAccCounter >= 3){
                        BlockUnblockUser(email, true);
                        setIsEmailBlank('');
                        setBlockedAccMsg('The account has been blocked, maximum loggin attempts reached.\nPlease contact with an administrator to unblock your account.');                                            
                    }                                                                                                    
                }
            }else{
                setBlockedAccMsg('Your account is blocked, please contact an administrator to unblock your account');
            }                        
        }else{            
            setIsEmailBlank('Please enter a valid email address')
        }        
    }

    return (
        <View style={styles.main_style}>

            <View>
                <Image source={require('../../../assets/logo.png')} style={styles.logo}/>
            </View>

            <View style={styles.login_box}>

                <View style={styles.textBox}>
                    <TextInput placeholder='Email@gmail.com' 
                    style={{
                        paddingHorizontal: 15
                    }}  
                    onChangeText={(text)=>setEmail(text)} />

                </View>

                <View style={styles.textBox}>
                    <TextInput
                        placeholder='Password'
                        style={{
                        paddingHorizontal: 15
                    }}
                        onChangeText={(text)=>setPassword(text)}
                        secureTextEntry={true} />
                </View>

                {isEmailBlank ? (
                    <Text style={styles.RequirementsMessage}>{isEmailBlank}</Text>
                ) : null}
                {blockedAccMsg ? (
                    <Text style={styles.RequirementsMessage}>{blockedAccMsg}</Text>
                ) : null}
                
                <View style={styles.mainButton}>
                    
                    <TouchableOpacity style={styles.button_box} onPress={loginUser}>

                        <Text style={styles.textButton}>Sign In</Text>

                    </TouchableOpacity>
                </View>

                <View >
                    
                     <Text style={styles.signUpTxt}>
                        Don't have an account?                        
                         <Text style={{color: 'blue'}} onPress={()=>props.navigation.navigate('SignUp')}> Sign Up</Text>                         
                     </Text>   
                </View>
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    main_style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC'
    },
    logo: {
        width: 100,
        height: 100,
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
    login_box: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textBox: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10
    },
    mainButton: {
        alignItems: 'center'
    },
    button_box: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    textButton: {
        textAlign: 'center',
        color: 'white'
    },
    signUpTxt:{
        marginTop:20,
        textAlign:'center',
    },
    RequirementsMessage: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
      },   
});