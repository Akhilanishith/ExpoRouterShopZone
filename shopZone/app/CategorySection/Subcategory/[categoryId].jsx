

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   Platform,
//   TextInput,
// } from 'react-native';
// import { useRouter, usePathname } from 'expo-router';
// import axios from 'axios';
// import Api from '../../../service/Api';
// import NavBar from '../../../components/WebNavBar';
// import useSetTitle from '../../../hooks/useSetTitle';
// import { ChevronDown } from 'lucide-react-native';
// import TypesProductsComponents from '../SubTypes/TypesProductsComponents';

// const SubcategoryScreen = () => {
//   useSetTitle('Subcategory');
//   const pathname = usePathname();
//   const router = useRouter();
//   const categoryId = pathname.split('/').pop();

//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState(null);
//   const [subtypes, setSubtypes] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Track selected subcategory
//   const [selectedSubtype, setSelectedSubtype] = useState(null); // Track selected subtype for fetching products

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
//         setSubcategories(response.data);
//         setFilteredSubcategories(response.data);
//       } catch (err) {
//         setError('Failed to load subcategories');
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     if (categoryId) {
//       fetchSubcategories();
//     }
//   }, [categoryId]);

//   const fetchSubtypes = async (subcategoryId) => {
//     try {
//       const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
//       setSubtypes(response.data);
//     } catch (err) {
//       console.error('Failed to load subtypes');
//     }
//   };

//   const handleHover = (subcategoryId) => {
//     setHoveredSubcategoryId(subcategoryId);
//     fetchSubtypes(subcategoryId);
//   };

//   const handleClick = (subcategoryId) => {
//     setSelectedSubcategory(subcategoryId); // Set selected subcategory
//     setSelectedSubtype(null); // Reset selected subtype when changing subcategory
//     router.push(`../SubTypes/${subcategoryId}`); // Navigate to SubcategoryTypeScreen
//   };
//   const handleSubtypeClick = (subtypeId) => {
//     setSelectedSubtype(subtypeId); // Set selected subtype
//   };

//   if (loading) return <ActivityIndicator style={styles.loader} />;
//   if (error) return <Text style={styles.errorText}>{error}</Text>;

//   return (
//     <>
//       {Platform.OS === 'web' && <NavBar />}
//       <View style={Platform.OS === 'web' ? styles.webContainer : styles.appContainer}>
//         {/* Search Bar for Mobile */}
//         {Platform.OS !== 'web' && (
//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search subcategories..."
//             value={searchQuery}
//             onChangeText={(query) => setSearchQuery(query)}
//           />
//         )}

//         {/* Web View */}
//         {Platform.OS === 'web' ? (
//           <View style={styles.webNavBar}>
//             {subcategories.map((item) => (
//               <TouchableOpacity
//                 key={item._id}
//                 onPress={() => handleClick(item._id)} // Handle click to select subcategory
//                 onMouseEnter={() => handleHover(item._id)} // Show subtypes on hover
//                 onMouseLeave={() => setHoveredSubcategoryId(null)} // Hide subtypes on leave
//                 style={styles.webSubcategoryItem}
//               >
//                 <View style={styles.webSubcategoryContainer}>
//                   <ChevronDown name="chevron-down" size={16} color="#888" style={styles.chevronIcon} />
//                   <Text style={styles.webSubcategoryText}>{item.name}</Text>
//                 </View>

//                 {/* Dropdown for subtypes */}
//                 {hoveredSubcategoryId === item._id && (
//                   <View style={styles.subtypeDropdownBox}>
//                     {subtypes.map((subtype) => (
//                       <View key={subtype._id} style={styles.subtypeItemBox}>
//                         <Text
//                           style={styles.subtypeName}
//                           onPress={() => handleSubtypeClick(subtype._id)} // Handle subtype click
//                         >
//                           {subtype.name}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </TouchableOpacity>
//             ))}
//           </View>
//         ) : (
//           // App View
//           <FlatList
//             data={filteredSubcategories}
//             keyExtractor={(item) => item._id}
//             numColumns={2}
//             renderItem={({ item }) => (
//               <View style={styles.appSubcategoryContainer}>
//                 {/* Subcategory */}
//                 <TouchableOpacity
//                   onPress={() => handleClick(item._id)}
//                   style={styles.appItem}
//                 >
//                   <Image
//                     source={{ uri: `${Api.main}/${item.imageUrl}` }}
//                     style={styles.subcategoryImage}
//                   />
//                   <Text style={styles.subcategoryText}>{item.name}</Text>
//                 </TouchableOpacity>

//                 {/* Subtypes */}
//                 {selectedSubcategory === item._id && (
//                   <FlatList
//                     data={subtypes}
//                     keyExtractor={(subtype) => subtype._id}
//                     horizontal
//                     renderItem={({ item: subtype }) => (
//                       <TouchableOpacity
//                         onPress={() => handleSubtypeClick(subtype._id)} // Display products for the selected subtype
//                         style={styles.subtypeItem}
//                       >
//                         <Image
//                           source={{ uri: `${Api.main}/${subtype.imageUrl}` }}
//                           style={styles.subcategoryImage}
//                         />
//                         <Text style={styles.subcategoryText}>{subtype.name}</Text>
//                       </TouchableOpacity>
//                     )}
//                   />
//                 )}
//               </View>
//             )}
//           />
//         )}

//         {/* Display products when a subtype is selected */}
//         {selectedSubtype && (
//           <TypesProductsComponents
//             category={categoryId}
//             subcategory={selectedSubcategory}
//             subTypes={selectedSubtype} // Pass the selected subtype as subTypes
//           />
//         )}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   loader: { flex: 1, justifyContent: 'center' },
//   errorText: { color: 'red', textAlign: 'center' },
//   webContainer: { flex: 1, padding: 10 },
//   appContainer: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
//   searchBar: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
//   webNavBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//   chevronIcon: { marginRight: 8 },
//   webSubcategoryItem: { position: 'relative', padding: 10, cursor: 'pointer' },
//   webSubcategoryText: { fontSize: 16, fontWeight: 'bold' },
//   subtypeDropdownBox: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     width: 200,
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//     borderRadius: 8,
//     zIndex: 100,
//     padding: 10,
//   },
//   webSubcategoryContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
//   subtypeItemBox: { paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   subtypeName: { fontSize: 14, color: '#333' },
//   appSubcategoryContainer: { marginBottom: 20 },
//   appItem: { alignItems: 'center', margin: 10 },
//   subtypeItem: { alignItems: 'center', marginHorizontal: 10 },
//   subcategoryImage: { width: 80, height: 80, borderRadius: 10 },
//   subcategoryText: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
// });

// export default SubcategoryScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { useRouter, usePathname } from 'expo-router';
// import axios from 'axios';
// import Api from '../../../service/Api';
// import NavBar from '../../../components/WebNavBar';
// import useSetTitle from '../../../hooks/useSetTitle';

// const ICON_COLOR = '#FF7F3E';
// const BG_COLOR = '#e7e7e76a';

// const SubcategoryScreen = () => {
//   useSetTitle('Subcategory');
//   const pathname = usePathname();
//   const router = useRouter();
//   const categoryId = pathname.split('/').pop();

//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
//         setSubcategories(response.data);
//       } catch (err) {
//         setError('Failed to load subcategories');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (categoryId) {
//       fetchSubcategories();
//     }
//   }, [categoryId]);

//   const handleSubcategoryPress = (subcategoryId) => {
//     router.push(`../SubTypes/${subcategoryId}`);
//   };

//   if (loading) return <ActivityIndicator style={styles.loader} />;
//   if (error) return <Text style={styles.errorText}>{error}</Text>;

//   return (
//     <>
//       {Platform.OS === 'web' && <NavBar />}
//       <View style={styles.backgroundContainer}>
//         <View style={styles.container}>
//           {subcategories.map((subcategory, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.categoryItem}
//               onPress={() => handleSubcategoryPress(subcategory._id)}
//             >
//               <View style={styles.iconBackground}>
//                 <Image
//                   source={{ uri: `${Api.main}/${subcategory.imageUrl}` }}
//                   style={styles.image}
//                 />
//               </View>
//               <Text style={styles.categoryText}>{subcategory.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundContainer: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//     gap: 10,
//     justifyContent: 'space-around',
//   },
//   categoryItem: {
//     width: 60,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   iconBackground: {
//     backgroundColor: BG_COLOR,
//     borderRadius: 25,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   categoryText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: ICON_COLOR,
//     marginTop: 4,
//   },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   errorText: { color: 'red', textAlign: 'center' },
// });

// export default SubcategoryScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';
import NavBar from '../../../components/WebNavBar';
import useSetTitle from '../../../hooks/useSetTitle';

const ICON_COLOR = '#000'; // Text color
const BG_COLOR = '#f5f5f5'; // Background color for circular container

const SubcategoryScreen = () => {
  useSetTitle('Subcategory');
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = pathname.split('/').pop();

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
        setSubcategories(response.data);
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

  const handleSubcategoryPress = (subcategoryId) => {
    router.push(`../SubTypes/${subcategoryId}`);
  };

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <>
      <View style={styles.backgroundContainer}>
        <View style={styles.container}>
          {subcategories.map((subcategory, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => handleSubcategoryPress(subcategory._id)}
            >
              <View style={styles.iconBackground}>
                <Image
                  source={{ uri: `${Api.main}/${subcategory.imageUrl}` }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.categoryText}>{subcategory.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

// const screenWidth = Dimensions.get('window').width;
// const itemWidth = screenWidth / 5 - 20; // Ensure 5 items in a row with spacing

const styles = StyleSheet.create({
  backgroundContainer: { flex: 1, backgroundColor: '#fff', padding: 10 },
container: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 10,
  gap: Platform.OS === 'web' ? 5 : 10, // Reduced gap for web
  justifyContent: Platform.OS === 'web' ? 'space-around' : 'flex-start', // Align items closely on the web
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
  errorText: { color: 'red', textAlign: 'center' },
});

export default SubcategoryScreen;




