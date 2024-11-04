import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const ProductCard = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.productCard} onPress={onPress}>
            <Image
                source={{ uri: 'https://rukminim2.flixcart.com/image/850/1000/kxaq7ww0/headphone/b/s/x/gaming-headphones-with-adjustable-mic-deep-bass-matlek-original-imag9s5kputhy6uj.jpeg' }}
                style={styles.productImage}
            />
            <Text style={styles.productName}>Wireless Headphones</Text>
            <Text style={styles.productPrice}>$120.00</Text>
            <View style={styles.colorOptions}>
                <View style={[styles.colorOption, { backgroundColor: '#3498db' }]} />
                <View style={[styles.colorOption, { backgroundColor: '#2ecc71' }]} />
                <View style={[styles.colorOption, { backgroundColor: '#e74c3c' }]} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    productCard: {
        width: '48%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding:10,
        ...Platform.OS === "web" && {
           maxWidth: 300,
           minWidth:250
        
        }
        
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    colorOptions: {
        flexDirection: 'row',
    },
    colorOption: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 4,
    },
})