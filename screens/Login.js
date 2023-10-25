import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';

export default function Login() {

    return (
        <View style={styles.main}>

            <View>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
            </View>

            <View style={styles.login_box}>

                <View style={styles.textBox}>
                    <TextInput
                        placeholder='email@gmail.com'
                        style={{
                        paddingHorizontal: 15
                    }}></TextInput>

                </View>

                <View style={styles.textBox}>
                    <TextInput
                        placeholder='password'
                        style={{
                        paddingHorizontal: 15
                    }}></TextInput>
                </View>

                <View style={styles.mainButton}>
                    <TouchableOpacity style={styles.button_box}>

                        <Text style={styles.textButton}>Sign In</Text>

                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
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
    }

});