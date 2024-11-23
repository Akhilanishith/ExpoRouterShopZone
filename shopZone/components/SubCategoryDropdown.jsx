import React, { useState, useContext } from 'react';
import {  ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import Api from '../service/Api';
import useFetchCustomHook from '../hooks/useFetchCustomHook';
import { AuthContext } from '../context/AuthContext';

const SubCategoryDropdown = ({ selectedSubCategory, onSubCategoryChange,categoryId }) => {
  const { token } = useContext(AuthContext);

  // State for the selected category
  const [subcategory, setSubCategory] = useState(selectedSubCategory);

  // Fetch categories using the custom hook
  const { data, loading, error} = useFetchCustomHook(`${Api.getSubcategoriesByCategory}/${categoryId}`, token);


  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <Picker
      selectedValue={subcategory}
      onValueChange={(itemValue) => {
        setSubCategory(itemValue);
        onSubCategoryChange(itemValue); // Notify parent component of the category change
      }}
      style={styles.picker}
    >
      <Picker.Item label="Select SubCategory" value="" />
      {data.map((cat) => (
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

export default SubCategoryDropdown;
