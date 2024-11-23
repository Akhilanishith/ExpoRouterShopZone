import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';

export default function SubcategoryScreen() {
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams() // Retrieve categoryId and categoryName from query

  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Failed to load subcategories');
      }
    };  

    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName || 'Category'} Subcategories</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {subcategories.length > 0 ? (
        <FlatList
          data={subcategories}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.subcategoryItem}>
              <Image
                source={{ uri: `${Api.main}/${item.imageUrl}` }}
                style={styles.subcategoryImage}
                resizeMode="contain"
              />
              <Text style={styles.subcategoryName}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        !error && <Text style={styles.noSubcategories}>No subcategories available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subcategoryItem: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  subcategoryImage: { width: 80, height: 80, marginBottom: 10 },
  subcategoryName: { fontSize: 18, textAlign: 'center' },
  noSubcategories: { fontSize: 18, color: "#888", textAlign: "center", marginTop: 20 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginVertical: 10 },
});
