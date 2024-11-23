import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import useFetchCustomHook from '../../hooks/useFetchCustomHook';
import Api from '../../service/Api';
// import { AuthContext } from '../../context/AuthContext';

const ICON_COLOR = '#FF7F3E';
const BG_COLOR = '#e7e7e76a';

const Category = () => {
  // const { token } = useContext(AuthContext);
  const { data, loading, error } = useFetchCustomHook(Api.getCategories);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    Alert.alert('Error', error.message || 'Something went wrong');
    return null;
  }

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        {data.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.iconBackground}>
              <Image
                source={{ uri: `${Api.main}/${category.imageUrl}` }}
                style={styles.image}
              />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // backgroundContainer: {
  //   flex: 1,
  //   backgroundColor: '#f0f0f0', // Change this to the desired background color
  //   paddingVertical: 20,
  // },
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginLeft: 40,
  },
  iconBackground: {
    backgroundColor: BG_COLOR,
    borderRadius: 25,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 60, // Adjust as needed to fit within the background
    height: 60, // Adjust as needed to fit within the background
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
