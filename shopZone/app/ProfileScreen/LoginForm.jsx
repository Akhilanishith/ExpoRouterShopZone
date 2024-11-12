import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConsentColors from "../../constants/constantColors"; 
import { Link } from 'expo-router';  // Import Link from expo-router

export default function LoginForm() {

    const fadeAnim = useRef(new Animated.Value(0)).current;  // Use useRef to avoid re-creating value on each render

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../assets/images/illustration.png')} // Ensure this path is correct
                    style={styles.illustration}
                />
                <Text style={styles.title}>Let's get started</Text>
                <Text style={styles.description}>
                    Shopping App for Gadgets and Gifts Discover Original Products
                </Text>

                {/* Link to the 'Auth' screen */}
                <Link href="/AuthScreen/AuthScreen" style={styles.button}>
    <Text style={styles.buttonText}>Register Or Login</Text>
</Link>


            </Animated.View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');  // For responsive design

// const styles = StyleSheet.create({
//     container: {
//         height: '100%',
//         backgroundColor: ConsentColors.backgroundColor, 
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//         ...Platform.OS === "web" && {height: '100vh'}
//     },
//     content: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     illustration: {
//         width: width * 0.4,  // Responsive width based on screen size
//         height: height * 0.25,
//         marginBottom: 30,
//         borderRadius: 50
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#FFF',
//         marginBottom: 10,
//     },
//     description: {
//         fontSize: 14,
//         color: '#EAEAEA',
//         textAlign: 'center',
//         marginBottom: 30,
//     },
//     button: {
//         backgroundColor: 'white',
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         borderRadius: 30,
//         marginBottom: 15,
//     },
//     buttonText: {
//         color: '#745EFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });


const styles = StyleSheet.create({
    // container: {
    //     height: '100%',
    //     backgroundColor: ConsentColors.backgroundColor, // Adjust to your desired background color
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingHorizontal: 20,
    // },
    container: {
        height: '100%',
        backgroundColor: ConsentColors.backgroundColor, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        ...Platform.OS === "web" && {height: '100vh'}
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 150,
        height: 150,
        marginBottom: 30,
        borderRadius: 50
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#EAEAEA',
        textAlign: 'center',
        marginBottom: 30,
    },


    button: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 15,
    },
    buttonText: {
        color: '#745EFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    outlineButtonText: {
        color: '#FFF',
    },
});


