import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User email: asdsa', user.uid);
    }

    });

export default function Home() { 
  
    return (
        <View style={styles.mainStyle}>
            <View>
                <Text style={{textAlign:'center'}}>WIP</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text style={{textAlign:'center'}}>aaaaa</Text>
                </TouchableOpacity>
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

})