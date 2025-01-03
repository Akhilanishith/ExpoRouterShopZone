
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { usePathname } from 'expo-router';
// import axios from 'axios';
// import Api from '../../../service/Api';
// import TypesProductsComponents from './TypesProductsComponents';

// const SubcategoryTypeScreen = () => {
//   const pathname = usePathname();
//   const [typeClickedID,setTypeClickedID] = useState(null)
//   const subcategoryId = pathname.split('/').pop();

//   const [subTypes, setSubTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSubTypes = async () => {
//       try {
//         const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
//         console.log(response.data)
//         setSubTypes(response.data);
//       } catch (err) {
//         setError('Failed to load subcategory types');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (subcategoryId) {
//       fetchSubTypes();
//     }
//   }, [subcategoryId]);

//   const handleTypeClick = async (id) => {
//     setTypeClickedID(id)
//   }

//   if (loading) return <ActivityIndicator style={styles.loader} />;
//   if (error) return <Text style={styles.errorText}>{error}</Text>;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Subcategory Types</Text>
//       <FlatList
//         data={subTypes}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleTypeClick(item._id)} style={styles.subTypeItem}>
//             <Image
//               source={{ uri: `${Api.main}/${item.imageUrl}` }}
//               style={styles.subTypeImage}
//               resizeMode="contain"
//             />
//             <Text style={styles.subTypeName}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       {typeClickedID && <TypesProductsComponents subTypes={typeClickedID} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   subTypeItem: { alignItems: 'center', marginBottom: 20 },
//   subTypeImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
//   subTypeName: { fontSize: 16, fontWeight: 'bold' },
//   loader: { flex: 1, justifyContent: 'center' },
//   errorText: { color: 'red', textAlign: 'center' },
// });

// export default SubcategoryTypeScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { usePathname } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';
import TypesProductsComponents from './TypesProductsComponents';
import useSetTitle from '../../../hooks/useSetTitle';

const ICON_COLOR = '#000'; // Text color
const BG_COLOR = '#f5f5f5'; // Background color for circular container

const SubcategoryTypeScreen = () => {
  useSetTitle('Types');
  const pathname = usePathname();
  const subcategoryId = pathname.split('/').pop();

  const [subTypes, setSubTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeClickedID, setTypeClickedID] = useState(null);

  useEffect(() => {
    const fetchSubTypes = async () => {
      try {
        const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
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

  const handleTypeClick = (id) => {
    setTypeClickedID(id);
  };

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
<View  style={styles.gridRow}>
  {
    subTypes.map((item, index) => (
      <TouchableOpacity
        key={item._id}
        onPress={() => handleTypeClick(item._id)}
        style={styles.appSubTypeItem}
      >
        <View style={styles.iconBackground}>
          <Image
            source={{ uri: `${Api.main}/${item.imageUrl}` }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.subTypeName}>{item.name}</Text>
      </TouchableOpacity>
    ))
  }
</View>
    

      {typeClickedID && <TypesProductsComponents subTypes={typeClickedID} />}
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const itemWidthApp = screenWidth / 5 - 10; // Calculate width for 5 items per row in app

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  scrollContainer: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 10 },
  gridRow: {flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    justifyContent: 'space-around',
    ...Platform.OS === "web" && {padding : 10,gap: 1}
  },

  // Common Styles
  iconBackground: {
    backgroundColor: BG_COLOR,
    borderRadius: 50, // Makes the container circular
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures image stays within the circle
  },
  image: { width: '100%', height: '100%' },
  subTypeName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ICON_COLOR,
  },

  // App-Specific Styles
  appSubTypeItem: {
    alignItems: 'center',
    
  },

  // Web-Specific Styles
  webSubTypeItem: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Ensures the image is aligned to the top
    marginHorizontal: 10,
    width: 100, // Fixed width for web
    paddingVertical: 10, // Add padding for consistent spacing
  },

  // Loader and Error Styles
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: 'red', textAlign: 'center' },
});


export default SubcategoryTypeScreen;
