import React, { useState, useContext } from 'react';
import {  ActivityIndicator, StyleSheet, Alert } from 'react-native';



import { AuthContext } from '../context/AuthContext';
import Api from '../service/Api';
import useFetchCustomHook from '../hooks/useFetchCustomHook';
import { Picker } from '@react-native-picker/picker';

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
    const { token } = useContext(AuthContext);

  // State for the selected category
  const [category, setCategory] = useState(selectedCategory);

  // Fetch categories using the custom hook
  const { data, loading, error } = useFetchCustomHook(Api.getCategories, token);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <Picker
      selectedValue={category}
      onValueChange={(itemValue) => {
        setCategory(itemValue);
        onCategoryChange(itemValue); // Notify parent component of the category change
      }}
      style={styles.picker}
    >
      <Picker.Item label="Select Category" value="" />
      {data?.map((cat) => (
        <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    marginBottom: 10,
  },
});

export default CategoryDropdown;
