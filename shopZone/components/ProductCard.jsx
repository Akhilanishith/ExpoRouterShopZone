// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const ProductCard = ({ product }) => (
//     <View style={styles.card}>
//         <Image source={{ uri: product.image }} style={styles.image} />
//         <View style={styles.cardContent}>
//             <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
//             <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//                 {product.description}
//             </Text>
//             <View style={styles.priceContainer}>
//                 <Text style={styles.sellingPrice}>${product.price.toFixed(2)}</Text>
//             </View>
//             <View style={styles.ratingContainer}>
//                 <Text style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count} reviews)</Text>
//             </View>
//         </View>
//     </View>
// );

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         overflow: 'hidden',
//         flexGrow: 1, // Allows the card to grow and take available space
//         flexShrink: 1, // Allows the card to shrink when there is not enough space
//         flexBasis: 160,
//         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         maxWidth: 200
//     },
//     image: {
//         width: '100%',
//         height: 150,
//         resizeMode: "center",
//     },
//     cardContent: {
//         padding: 12,
//     },
//     name: {
//         fontSize: 14,  // Lower the font size
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 8,
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     sellingPrice: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#4CAF50',
//     },
//     ratingContainer: {
//         marginTop: 8,
//     },
//     rating: {
//         fontSize: 14,
//         color: '#ff5900', // Golden color for rating stars
//     },
// });

// export default ProductCard;
// app/components/ProductCard.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Api from '../service/Api';

const ProductCard = ({ product }) => {
    const router = useRouter();

 
    
    return (
        <TouchableOpacity onPress={() => router.push(`/itemDetail/${product._id}`)}  style={styles.card}>
            <View>
                <Image source={{ uri : Api.main+product.images[0]}} style={styles.image} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                    {product.description}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.sellingPrice}>₹{product.originalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 160,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: 200,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'center',
    },
    cardContent: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sellingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    ratingContainer: {
        marginTop: 8,
    },
    rating: {
        fontSize: 14,
        color: '#ff5900',
    },
});

export default ProductCard;
