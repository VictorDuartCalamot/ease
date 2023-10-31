import { Text, StyleSheet, View } from 'react-native';
import React from 'react';

export default function Home() { 
  
    return (
        <View style={styles.mainStyle}>
            <View>
                <Text style={{textAlign:'center'}}>WIP</Text>
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