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
import firebaseApp from '../login_auth';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(firebaseApp)


export default function Login(props) {

    //Create status variable
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    
    //Ruta para acceder a la pantalla de Home
    const log_in = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert('Sesion Iniciada')            
            props.navigation.navigate('Home')
        } catch (error) {
            console.log(error);
            Alert.alert('El usuario o la contraseña son incorrectos.')            
                                
        }
    }

    return (
        <View style={styles.main_style}>

            <View>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
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
                
                <View style={styles.mainButton}>
                    
                    <TouchableOpacity style={styles.button_box} onPress={log_in}>

                        <Text style={styles.textButton}>Sign In</Text>

                    </TouchableOpacity>
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
   

});