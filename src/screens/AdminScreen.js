import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Fetch from './main/fetch';

export default function AdminScreen() {
    return (
        <View style={styles.container}>
        <Fetch/>
        </View>
    )
};

const styles=StyleSheet.create({
    container:  {
        flex: 1,
    }
});