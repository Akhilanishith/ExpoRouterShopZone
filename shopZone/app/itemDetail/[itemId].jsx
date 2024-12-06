import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Api from '../../service/Api';
import { AuthContext } from '../../context/AuthContext';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';



const ItemDetails = () => {
  const { itemId } = useLocalSearchParams(); // Get the product ID from the route parameters
  const { token } = useContext(AuthContext);
  const [imageIndex, setImageIndex] = useState(0)
  const { data, loading, error } = useFetchCustomHook(
    `${Api.getProductById}/${itemId}`,
    token
  );

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

  const colors = [
    { id: 1, image: '/placeholder.svg?height=60&width=60', color: 'navy' },
    { id: 2, image: '/placeholder.svg?height=60&width=60', color: 'orange' },
    { id: 3, image: '/placeholder.svg?height=60&width=60', color: 'red' },
    { id: 4, image: '/placeholder.svg?height=60&width=60', color: 'black' },
    { id: 5, image: '/placeholder.svg?height=60&width=60', color: 'green' },
  ]





  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  // Error state
  if (error) {
    return <Text style={styles.emptyText}>errr</Text>
  }
  if (!data.success) {
    return <Text style={styles.emptyText}>errr</Text>
  }



  return (
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image source={{ uri: Api.main + data.product.images[imageIndex] }} style={styles.image} />
          <View style={styles.allImageContainer}>
            {
              data.product.images.map((img, i) => <TouchableOpacity key={i} onPress={() => setImageIndex(i)} ><Image source={{ uri: Api.main + img }} style={[styles.allImage,{borderColor: i=== imageIndex ? "red" :"black"}]} /></TouchableOpacity>
              )
            }

          </View>

        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>TRIGGR Ultrabuds N1 Neo </Text>
          <Text style={styles.description}>TRIGGR Ultrabuds N1 Neo with ENC, 40Hr Playback, 13mm Drivers, Rich Bass, Fast Charging Bluetooth  (Sky Black, True Wireless)</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{data.product.originalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.5 (4 reviews)</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent:"center",  gap: 4, marginBottom:4}}>
            {colors.map((c, i) => <TouchableOpacity key={i} style={{ padding: 15, backgroundColor: c.color, borderRadius: 50 }}></TouchableOpacity>
            )}
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent:"center", gap: 4, marginBottom:4 }}>
            {sizes.map((s, i) => <TouchableOpacity key={i} style={{ borderRadius: 50 }}><Text style={{

              padding: 5,
              width: 45,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "#dcdcdc",
              color: "#000000",
              borderRadius: 5,
              fontSize: 16,
            }}>{s}</Text></TouchableOpacity>
            )}
          </View>
          <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
          <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
          <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>
          <Text style={styles.description}>Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</Text>

        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    padding: 5,
    backgroundColor: 'white',

  },
  container: {
    display: 'flex',
    ...Platform.OS === "web" && {
      flexDirection: "row",
      flexWrap: 'wrap',
      alignItems: "center",
      justifyContent: 'center',
    }


  },
  imageContainer: {

  },

  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  allImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  allImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginHorizontal: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
   
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 400,
    ...Platform.OS === "web" && {
      maxWidth:700,
      padding: 16,
      
    }

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ratingContainer: {
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#ff5900',
  },
  loader: {
    marginTop: '50%',
  },
  errorContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: '50%',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ItemDetails;

