// import React, {  useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
// import { usePathname } from 'expo-router';
// import axios from 'axios';
// import Api from '../../../service/Api';

// const SubcategoryTypeScreen = () => {

//   const pathname = usePathname();
//   const subcategoryId = pathname.split('/').pop();

//   const [subTypes, setSubTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSubTypes = async () => {
//       try {
//         const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`);
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

//   if (loading) {
//     return <ActivityIndicator style={styles.loader} />;
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Subcategory Types</Text>
//       {subTypes.length > 0 ? (
//         <FlatList
//           data={subTypes}
//           keyExtractor={(item) => item._id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.subTypeItem}>
//               <Image
//                 source={{ uri: `${Api.main}/${item.imageUrl}` }}
//                 style={styles.subTypeImage}
//                 resizeMode="contain"
//               />
//               <Text style={styles.subTypeName}>{item.name}</Text>
//             </View>
//           )}
//         />
//       ) : (
//         <Text style={styles.noDataText}>No subcategory types available</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   subTypeItem: {
//     padding: 15,
//     backgroundColor: '#e0e0e0',
//     marginBottom: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   subTypeImage: { width: 80, height: 80, marginBottom: 10 },
//   subTypeName: { fontSize: 18, textAlign: 'center' },
//   noDataText: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
//   errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginVertical: 10 },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// export default SubcategoryTypeScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { usePathname } from 'expo-router';
import axios from 'axios';
import Api from '../../../service/Api';

const SubcategoryTypeScreen = () => {
  const pathname = usePathname();
  const subcategoryId = pathname.split('/').pop();

  const [subTypes, setSubTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subcategory Types</Text>
      <FlatList
        data={subTypes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.subTypeItem}>
            <Image
              source={{ uri: `${Api.main}/${item.imageUrl}` }}
              style={styles.subTypeImage}
              resizeMode="contain"
            />
            <Text style={styles.subTypeName}>{item.name}</Text>
          </View>
        )}
      />
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
//hiii