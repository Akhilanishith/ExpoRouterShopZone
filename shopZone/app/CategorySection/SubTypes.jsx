import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';

export default function SubcategoryTypesScreen() {
  const { subcategoryId, subcategoryName } = useLocalSearchParams(); // Retrieve subcategoryId and subcategoryName from query

  const [subtypes, setSubtypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubtypes = async () => {
      try {
        const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
        setSubtypes(response.data);
      } catch (error) {
        console.error('Error fetching subtypes:', error);
        setError('Failed to load subtypes');
      }
    };

    if (subcategoryId) {
      fetchSubtypes();
    }
  }, [subcategoryId]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subcategoryName || 'Subcategory'} Types</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {subtypes.length > 0 ? (
        <FlatList
          data={subtypes}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2} // Display items in two columns
          columnWrapperStyle={styles.row} // Spacing between items in the row
          renderItem={({ item }) => (
            <View style={[styles.subtypeItem, { width: screenWidth / 2 - 30 }]}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `${Api.main}/${item.imageUrl}` }}
                  style={styles.subtypeImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.subtypeName}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        !error && <Text style={styles.noSubtypes}>No subtypes available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center' },
  row: { justifyContent: 'space-between', marginBottom: 15 }, // Space between items in a row
  subtypeItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Add elevation for Android shadow effect
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40, // Round image container for a circular effect
    overflow: 'hidden',
  },
  subtypeImage: { width: '100%', height: '100%' },
  subtypeName: { fontSize: 16, textAlign: 'center', fontWeight: '500' },
  noSubtypes: { fontSize: 18, color: "#888", textAlign: "center", marginTop: 20 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginVertical: 10 },
});