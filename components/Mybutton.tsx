import React, {FC} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

interface Props {
    title: String
}

const Mybutton : FC<Props> = ({title}) => {
    return (
        <TouchableOpacity style={styles.container}>
                <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Mybutton

const styles = StyleSheet.create({
    container:{
        height:50,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5DB47B",
        borderRadius:30,
        marginTop:15,
    },
    title:{
        color:"white",
        fontSize:20,
    }
    
})