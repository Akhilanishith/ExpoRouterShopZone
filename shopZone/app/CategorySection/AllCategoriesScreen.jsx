import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Import for arrow icon
import axios from 'axios';
import Api from '../../service/Api';

export default function AllCategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(Api.getCategories);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleNavigateToSubcategory = (categoryId, categoryName) => {
    router.push({
      pathname: '../CategorySection/SubCategoriesScreen',
      params: { categoryId: categoryId.toString(), categoryName },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigateToSubcategory(item._id, item.name)}
            style={styles.categoryItem}
          >
            <Image
              source={{ uri: Api.main + "/" + item.imageUrl }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <Text style={styles.categoryName}>{item.name}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#777" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});