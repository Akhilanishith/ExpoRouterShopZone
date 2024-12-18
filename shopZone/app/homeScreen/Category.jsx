import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import Api from '../../service/Api';
import useSetTitle from '../../hooks/useSetTitle';

const ICON_COLOR = '#FF7F3E';
const BG_COLOR = '#e7e7e76a';

const Category = () => {
  useSetTitle('fgh');
  const router = useRouter();
  const { data, loading, error } = useFetchCustomHook(Api.getCategories);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    Alert.alert('Error', error.message || 'Something went wrong');
    return null;
  }

  const handleCategoryPress = (categoryId) => {
    router.push(`../CategorySection/Subcategory/${categoryId}`);
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.container}>
        {data.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category._id)}
          >
            <View style={styles.iconBackground}>
              <Image
                source={{ uri: `${Api.main}/${category.imageUrl}` }}
                style={styles.image}
              />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    justifyContent: 'space-around',
  },
  categoryItem: {
    width: 60,
  },
  iconBackground: {
    backgroundColor: BG_COLOR,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ICON_COLOR,
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Category;