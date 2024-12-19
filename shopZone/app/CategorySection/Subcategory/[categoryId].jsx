

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';
import NavBar from '../../../components/WebNavBar';
import useSetTitle from '../../../hooks/useSetTitle';
import { ChevronDown } from 'lucide-react-native';
import TypesProductsComponents from '../SubTypes/TypesProductsComponents';

const SubcategoryScreen = () => {
  useSetTitle('Subcategory');
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = pathname.split('/').pop();

  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState(null);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Track selected subcategory
  const [selectedSubtype, setSelectedSubtype] = useState(null); // Track selected subtype for fetching products

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
        setSubcategories(response.data);
        setFilteredSubcategories(response.data);
      } catch (err) {
        setError('Failed to load subcategories');
      } finally {
        setLoading(false);
      }
    };
    

    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  const fetchSubtypes = async (subcategoryId) => {
    try {
      const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
      setSubtypes(response.data);
    } catch (err) {
      console.error('Failed to load subtypes');
    }
  };

  const handleHover = (subcategoryId) => {
    setHoveredSubcategoryId(subcategoryId);
    fetchSubtypes(subcategoryId);
  };

  const handleClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId); // Set selected subcategory
    setSelectedSubtype(null); // Reset selected subtype when changing subcategory
    router.push(`../SubTypes/${subcategoryId}`); // Navigate to SubcategoryTypeScreen
  };
  const handleSubtypeClick = (subtypeId) => {
    setSelectedSubtype(subtypeId); // Set selected subtype
  };

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <>
      {Platform.OS === 'web' && <NavBar />}
      <View style={Platform.OS === 'web' ? styles.webContainer : styles.appContainer}>
        {/* Search Bar for Mobile */}
        {Platform.OS !== 'web' && (
          <TextInput
            style={styles.searchBar}
            placeholder="Search subcategories..."
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
          />
        )}

        {/* Web View */}
        {Platform.OS === 'web' ? (
          <View style={styles.webNavBar}>
            {subcategories.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => handleClick(item._id)} // Handle click to select subcategory
                onMouseEnter={() => handleHover(item._id)} // Show subtypes on hover
                onMouseLeave={() => setHoveredSubcategoryId(null)} // Hide subtypes on leave
                style={styles.webSubcategoryItem}
              >
                <View style={styles.webSubcategoryContainer}>
                  <ChevronDown name="chevron-down" size={16} color="#888" style={styles.chevronIcon} />
                  <Text style={styles.webSubcategoryText}>{item.name}</Text>
                </View>

                {/* Dropdown for subtypes */}
                {hoveredSubcategoryId === item._id && (
                  <View style={styles.subtypeDropdownBox}>
                    {subtypes.map((subtype) => (
                      <View key={subtype._id} style={styles.subtypeItemBox}>
                        <Text
                          style={styles.subtypeName}
                          onPress={() => handleSubtypeClick(subtype._id)} // Handle subtype click
                        >
                          {subtype.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // App View
          <FlatList
            data={filteredSubcategories}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.appSubcategoryContainer}>
                {/* Subcategory */}
                <TouchableOpacity
                  onPress={() => handleClick(item._id)}
                  style={styles.appItem}
                >
                  <Image
                    source={{ uri: `${Api.main}/${item.imageUrl}` }}
                    style={styles.subcategoryImage}
                  />
                  <Text style={styles.subcategoryText}>{item.name}</Text>
                </TouchableOpacity>

                {/* Subtypes */}
                {selectedSubcategory === item._id && (
                  <FlatList
                    data={subtypes}
                    keyExtractor={(subtype) => subtype._id}
                    horizontal
                    renderItem={({ item: subtype }) => (
                      <TouchableOpacity
                        onPress={() => handleSubtypeClick(subtype._id)} // Display products for the selected subtype
                        style={styles.subtypeItem}
                      >
                        <Image
                          source={{ uri: `${Api.main}/${subtype.imageUrl}` }}
                          style={styles.subcategoryImage}
                        />
                        <Text style={styles.subcategoryText}>{subtype.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            )}
          />
        )}

        {/* Display products when a subtype is selected */}
        {selectedSubtype && (
          <TypesProductsComponents
            category={categoryId}
            subcategory={selectedSubcategory}
            subTypes={selectedSubtype} // Pass the selected subtype as subTypes
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: 'red', textAlign: 'center' },
  webContainer: { flex: 1, padding: 10 },
  appContainer: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
  searchBar: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
  webNavBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chevronIcon: { marginRight: 8 },
  webSubcategoryItem: { position: 'relative', padding: 10, cursor: 'pointer' },
  webSubcategoryText: { fontSize: 16, fontWeight: 'bold' },
  subtypeDropdownBox: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: 8,
    zIndex: 100,
    padding: 10,
  },
  webSubcategoryContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  subtypeItemBox: { paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#eee' },
  subtypeName: { fontSize: 14, color: '#333' },
  appSubcategoryContainer: { marginBottom: 20 },
  appItem: { alignItems: 'center', margin: 10 },
  subtypeItem: { alignItems: 'center', marginHorizontal: 10 },
  subcategoryImage: { width: 80, height: 80, borderRadius: 10 },
  subcategoryText: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});

export default SubcategoryScreen;


