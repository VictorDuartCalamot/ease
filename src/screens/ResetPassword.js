import { Text, StyleSheet, View,TextInput } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ResetPasswordScreen(props) { 
  
    return (
        <View style={styles.mainStyle}>
            <View>
                <Text style={{}}>Forgot your password?</Text>                
            </View>

            <View>
            <Text style={{}}>You will be sent an email to reset your password.</Text>
                <TextInput style={{}} placeholder='Type your email'></TextInput>                                    
            </View>

            <View style={{}}>                    
                <TouchableOpacity style={styles.button_box}>
                    <Text style={styles.textButton}>Reset my password</Text>
                </TouchableOpacity>
            </View>

            <View>                
          <Text style={styles.signUpTxt}>            
            <Text style={{color: 'blue'}} onPress={()=>props.navigation.popToTop()}> Go back</Text>                         
          </Text>         
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC'
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
})