import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, {useState,useEffect} from 'react';

//Firebase auth
//import firebaseApp from '../../../firebase/firebaseConfig';
import {firebaseAuth} from '../../../firebase/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { ResetPassword } from '../../utils/dbUtils';
import {BlockUnblockUser,LoginHistoryRegistry, isAccBlocked,getUserDocIdWithEmail,getUserReference} from '../../utils/dbUtils';
import {EmailExists,isValidEmail} from '../../utils/validationUtils';
import { firebase} from '../../../firebase/firebaseConfig';
db = firebase.firestore();
export default function Login(props) {

    //Create status variable
    const [lastEmail,setLastEmail] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isEmailBlank, setIsEmailBlank] = useState();
    const [blockAccCounter, setBlockAccCounter] = useState(1);
    const [blockedAccMsg,setBlockedAccMsg] = useState();   

    useEffect(() => {
        //console.debug('Email changed. Current email:', email, 'Last email:', lastEmail);
        if (email !== lastEmail) {
            //console.debug('Email changed. Resetting counter to 1.');
            setBlockAccCounter(1);
        }       
    }, [email, lastEmail, blockAccCounter]);
    
    async function loginUser() {                    
        //console.log('Login button clicked!');                  
        setIsEmailBlank('');
        setBlockedAccMsg(''); 
        const emailLowerCase = email.toLowerCase();                 
        try{
            if(isValidEmail(emailLowerCase)) {                                                                
                setLastEmail(emailLowerCase);                                                        
                const isBlocked = await isAccBlocked(emailLowerCase);
                if (!isBlocked) {                              
                    try{                                               
                        await signInWithEmailAndPassword(firebaseAuth, emailLowerCase, password)                        
                        LoginHistoryRegistry(emailLowerCase,true)
                        Alert.alert('Sesion Iniciada')                        
                    }catch(error){                                                
                        //console.error(error);                        
                        const realEmail = await EmailExists(emailLowerCase);                        
                        if (realEmail){
                            await LoginHistoryRegistry(emailLowerCase,false,'Incorrect password.')
                            //Gets the previous state of the BlockAccCounter and increments it +1                                                      
                            if (blockAccCounter >= 3){
                                await BlockUnblockUser(emailLowerCase, true);                            
                                setBlockedAccMsg('The account has been blocked, maximum loggin attempts reached.\nPlease contact with an administrator to unblock your account.');                                            
                                setBlockAccCounter(1);                                
                            } else{
                                setIsEmailBlank('Email or password incorrect, please try again.')
                                setBlockAccCounter((prevCounter) => prevCounter + 1);                                                         
                            }                            
                        }else{
                            setIsEmailBlank('Email or password incorrect, please try again.')
                        }                                                                                   
                    }                                    
                }else{
                    setBlockedAccMsg('Your account is blocked, please contact an administrator to unblock your account');
                }   
            }else{
                setIsEmailBlank('Email or password incorrect, please try again.')
            }                         
        }catch(error){
            console.log(error);          
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
                <View>
                <Text style={styles.signUpTxt}>
                        Forgot your password?                        
                         <Text style={{color: 'blue'}} onPress={() => props.navigation.navigate("ResetPassword")}> Reset it</Text>                         
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
        //backgroundColor: '#FCFCFC'
        backgroundColor: '#F7F9F9',
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
        marginTop:'2%',
        textAlign:'center',
    },
    RequirementsMessage: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
      },   
});