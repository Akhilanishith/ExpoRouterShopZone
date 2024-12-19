
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { usePathname } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';
import TypesProductsComponents from './TypesProductsComponents';

const SubcategoryTypeScreen = () => {
  const pathname = usePathname();
  const [typeClickedID,setTypeClickedID] = useState(null)
  const subcategoryId = pathname.split('/').pop();

  const [subTypes, setSubTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubTypes = async () => {
      try {
        const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
        console.log(response.data)
        setSubTypes(response.data);
      } catch (err) {
        setError('Failed to load subcategory types');
      } finally {
        setLoading(false);
      }
    };

    if (subcategoryId) {
      fetchSubTypes();
    }
  }, [subcategoryId]);

  const handleTypeClick = async (id) => {
    setTypeClickedID(id)
  }

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subcategory Types</Text>
      <FlatList
        data={subTypes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTypeClick(item._id)} style={styles.subTypeItem}>
            <Image
              source={{ uri: `${Api.main}/${item.imageUrl}` }}
              style={styles.subTypeImage}
              resizeMode="contain"
            />
            <Text style={styles.subTypeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {typeClickedID && <TypesProductsComponents subTypes={typeClickedID} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subTypeItem: { alignItems: 'center', marginBottom: 20 },
  subTypeImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  subTypeName: { fontSize: 16, fontWeight: 'bold' },
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: 'red', textAlign: 'center' },
});

export default SubcategoryTypeScreen;
