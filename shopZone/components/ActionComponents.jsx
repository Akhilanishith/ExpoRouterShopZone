import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomInput = ({ value, onChangeText, placeholder, keyboardType }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType || "default"}
                onChangeText={onChangeText}
            />
        </View>
    );
};
const CustomButton = ({ title, bg, txtClr, onclick }) => {

    const bgColor = bg ? bg : "#007BFF"
    const txtColor = txtClr ? txtClr : "#fff"
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: bgColor, color: txtColor }]} onPress={onclick}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};




export default function CustomBackButton({onclick}) {
    return (
        <TouchableOpacity style={{marginLeft:20}} onPress={onclick}>
            <Ionicons name="arrow-back-circle" size={30} color="white" />
        </TouchableOpacity>
    )
}

export { CustomInput, CustomButton };

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f1',
        borderRadius: 10,
        margin: 15
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        width: "100%",
        backgroundColor: '#fff',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: 'rgba(0, 255, 55, 0.16)',
        alignItems: 'center', // Center the text horizontally
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
});
