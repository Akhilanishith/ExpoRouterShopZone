import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext'; // Import the context
import useFetchCustomHook from '../../../hooks/useFetchCustomHook'; // Import the custom hook
import Api from '../../../service/Api';
import useSetTitle from '../../../hooks/useSetTitle';
import { router } from 'expo-router';

const BrandSelectScreen = () => { 
  useSetTitle('Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { token } = useContext(AuthContext);

  const { data, loading, error } = useFetchCustomHook(Api.getAdminBrands, token);

  // Update the filtered brands whenever 'data' or 'searchQuery' changes
  useEffect(() => {
    if (data?.brands) {
      const filtered = data.brands.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [data, searchQuery]);

  // Error handling
  if (loading) {
    return <Text style={styles.emptyList}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.emptyList}>Error: {error}</Text>;
  }

  // Render a brand item
  const renderBrandItem = ({ item }) => (
    <TouchableOpacity style={styles.brandItem} onPress={()=> router.push(`../useBrandForm/${item._id}`)}>
      <Image source={{ uri: Api.main+item.logo }} style={styles.brandLogo} />
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.brandMeta}>
          <Text style={[styles.brandStatus, { color: item.status === 'verified' ? 'green' : 'orange' }]}>
            {item.status}
          </Text>
          {item.official && <Text style={styles.officialBadge}>Official</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search brands..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {data?.brands && filteredBrands.length === 0 && (
        <Text style={styles.emptyList}>No brands found</Text>
      )}
      <FlatList
        data={filteredBrands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.emptyList}>No brands found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: 'white',
  },
  brandItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandDescription: {
    fontSize: 14,
    color: 'gray',
  },
  brandMeta: {
    flexDirection: 'row',
    marginTop: 5,
  },
  brandStatus: {
    fontSize: 12,
    marginRight: 10,
  },
  officialBadge: {
    fontSize: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});

export default BrandSelectScreen;
