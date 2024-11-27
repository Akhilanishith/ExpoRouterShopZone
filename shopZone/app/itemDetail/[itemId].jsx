// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   useWindowDimensions,
//   Platform,
//   FlatList,
// } from 'react-native';

// // Mock data
// const itemData = {
//   id: '1',
//   name: "Premium Cotton T-Shirt",
//   brand: "FashionBrand",
//   price: 29.99,
//   rating: 4.5,
//   reviews: [
//     { id: '1', user: 'John D.', rating: 5, comment: 'Great quality and fit!', date: '2023-05-15' },
//     { id: '2', user: 'Sarah M.', rating: 4, comment: 'Nice shirt, but runs a bit small.', date: '2023-05-10' },
//     { id: '3', user: 'Mike R.', rating: 5, comment: 'Excellent material and very comfortable.', date: '2023-05-05' },
//   ],
//   description: "This premium cotton t-shirt offers unparalleled comfort and style. Perfect for casual wear or layering, it's a versatile addition to any wardrobe.",
//   features: [
//     "100% organic cotton",
//     "Breathable fabric",
//     "Reinforced stitching",
//     "Pre-shrunk",
//   ],
//   sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//   colors: ["White", "Black", "Navy", "Gray", "Red"],
//   images: [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR89xN2mLwV4hNxlc6otiaf9s_n7XlbmuHsjxtoa-DfkCFkyGCVvB61o_BGukaqBegswI&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1bRrVBFVWCrMahlYKb0Yvy4VYecLLEAH25GaPB9dREqz-Vk5jBM99wuFEc3N1wx6AWI&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR89xN2mLwV4hNxlc6otiaf9s_n7XlbmuHsjxtoa-DfkCFkyGCVvB61o_BGukaqBegswI&usqp=CAU",
//   ],
// };

// const relatedItems = [
//   { id: '2', name: 'Classic Denim Jeans', price: 49.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1bRrVBFVWCrMahlYKb0Yvy4VYecLLEAH25GaPB9dREqz-Vk5jBM99wuFEc3N1wx6AWI&usqp=CAU' },
//   { id: '3', name: 'Leather Sneakers', price: 79.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1bRrVBFVWCrMahlYKb0Yvy4VYecLLEAH25GaPB9dREqz-Vk5jBM99wuFEc3N1wx6AWI&usqp=CAU' },
//   { id: '4', name: 'Cotton Hoodie', price: 39.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1bRrVBFVWCrMahlYKb0Yvy4VYecLLEAH25GaPB9dREqz-Vk5jBM99wuFEc3N1wx6AWI&usqp=CAU' },
// ];

// const ItemDetailsScreen = () => {
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { width } = useWindowDimensions();

//   const isWeb = Platform.OS === 'web';
//   const imageWidth = isWeb ? Math.min(width * 0.9, 500) : width;

//   const ImageCarousel = () => (
//     <View style={[styles.imageCarousel, { height: imageWidth }]}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={(event) => {
//           const newIndex = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
//           setCurrentImageIndex(newIndex);
//         }}
//       >
//         {itemData.images.map((image, index) => (
//           <Image
//             key={index}
//             source={{ uri: image }}
//             style={[styles.image, { width: imageWidth, height: imageWidth }]}
//             resizeMode="cover"
//           />
//         ))}
//       </ScrollView>
//       <View style={styles.pagination}>
//         {itemData.images.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === currentImageIndex && styles.paginationDotActive,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );

//   const SizeSelector = () => (
//     <View style={styles.selectorContainer}>
//       <Text style={styles.selectorTitle}>Size:</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {itemData.sizes.map((size) => (
//           <TouchableOpacity
//             key={size}
//             style={[
//               styles.sizeButton,
//               selectedSize === size && styles.selectedButton,
//             ]}
//             onPress={() => setSelectedSize(size)}
//           >
//             <Text style={[
//               styles.sizeButtonText,
//               selectedSize === size && styles.selectedButtonText,
//             ]}>
//               {size}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );

//   const ColorSelector = () => (
//     <View style={styles.selectorContainer}>
//       <Text style={styles.selectorTitle}>Color:</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {itemData.colors.map((color) => (
//           <TouchableOpacity
//             key={color}
//             style={[
//               styles.colorButton,
//               { backgroundColor: color.toLowerCase() },
//               selectedColor === color && styles.selectedColorButton,
//             ]}
//             onPress={() => setSelectedColor(color)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );

//   const ReviewItem = ({ review }) => (
//     <View style={styles.reviewItem}>
//       <View style={styles.reviewHeader}>
//         <Text style={styles.reviewUser}>{review.user}</Text>
//         <Text style={styles.reviewDate}>{review.date}</Text>
//       </View>
//       <View style={styles.ratingContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Text key={star} style={[styles.star, star <= review.rating && styles.starFilled]}>
//             ★
//           </Text>
//         ))}
//       </View>
//       <Text style={styles.reviewComment}>{review.comment}</Text>
//     </View>
//   );

//   const RelatedItem = ({ item }) => (
//     <View style={styles.relatedItem}>
//       <Image source={{ uri: item.image }} style={styles.relatedItemImage} />
//       <Text style={styles.relatedItemName} numberOfLines={2}>{item.name}</Text>
//       <Text style={styles.relatedItemPrice}>${item.price.toFixed(2)}</Text>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={[styles.content, isWeb && styles.webContent]}>
//         <ImageCarousel />
//         <View style={styles.detailsContainer}>
//           <Text style={styles.brand}>{itemData.brand}</Text>
//           <Text style={styles.name}>{itemData.name}</Text>
//           <View style={styles.ratingContainer}>
//             <Text style={styles.starFilled}>★</Text>
//             <Text style={styles.rating}>{itemData.rating}</Text>
//             <Text style={styles.reviews}>({itemData.reviews.length} reviews)</Text>
//           </View>
//           <Text style={styles.price}>${itemData.price.toFixed(2)}</Text>
//           <SizeSelector />
//           <ColorSelector />
//           <Text style={styles.description}>{itemData.description}</Text>
//           <View style={styles.featuresContainer}>
//             <Text style={styles.featuresTitle}>Features:</Text>
//             {itemData.features.map((feature, index) => (
//               <View key={index} style={styles.featureItem}>
//                 <Text style={styles.featureIcon}>✓</Text>
//                 <Text style={styles.featureText}>{feature}</Text>
//               </View>
//             ))}
//           </View>
//           <TouchableOpacity style={styles.addToCartButton}>
//             <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//           </TouchableOpacity>

//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Reviews</Text>
//             {itemData.reviews.map((review) => (
//               <ReviewItem key={review.id} review={review} />
//             ))}
//           </View>

//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Related Items</Text>
//             <FlatList
//               data={relatedItems}
//               renderItem={({ item }) => <RelatedItem item={item} />}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//             />
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     flex: 1,
//   },
//   webContent: {
//     maxWidth: 1200,
//     alignSelf: 'center',
//     width: '100%',
//     paddingHorizontal: 16,
//   },
//   imageCarousel: {
//     position: 'relative',
//   },
//   image: {
//     resizeMode: 'cover',
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 16,
//     alignSelf: 'center',
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: '#000',
//   },
//   detailsContainer: {
//     padding: 16,
//   },
//   brand: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 4,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   star: {
//     fontSize: 18,
//     color: '#ccc',
//   },
//   starFilled: {
//     fontSize: 18,
//     color: '#FFD700',
//   },
//   rating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 4,
//   },
//   reviews: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 4,
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 16,
//   },
//   selectorContainer: {
//     marginBottom: 16,
//   },
//   selectorTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   sizeButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   selectedButton: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   sizeButtonText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   selectedButtonText: {
//     color: '#fff',
//   },
//   colorButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   selectedColorButton: {
//     borderWidth: 2,
//     borderColor: '#007AFF',
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 16,
//   },
//   featuresContainer: {
//     marginBottom: 16,
//   },
//   featuresTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   featureIcon: {
//     fontSize: 16,
//     color: '#4CAF50',
//     marginRight: 8,
//   },
//   featureText: {
//     fontSize: 16,
//   },
//   addToCartButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   addToCartButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   sectionContainer: {
//     marginTop: 24,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   reviewItem: {
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 16,
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//   },
//   reviewUser: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   reviewDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   reviewComment: {
//     fontSize: 16,
//     marginTop: 8,
//   },
//   relatedItem: {
//     width: 150,
//     marginRight: 16,
//   },
//   relatedItemImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   relatedItemName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   relatedItemPrice: {
//     fontSize: 14,
//     color: '#4CAF50',
//   },
// });

// export default ItemDetailsScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  FlatList,
} from 'react-native';
import useSetTitle from '../../hooks/useSetTitle';

// ItemDetailsScreen component
const ItemDetailsScreen = () => {
  useSetTitle("Detailes");
  const [product, setProduct] = useState(null); // state to hold the product details
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { width } = useWindowDimensions();
  

  const isWeb = Platform.OS === 'web';
  const imageWidth = isWeb ? Math.min(width * 0.9, 500) : width;

  // Fetch product data when component mounts
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1')
      .then((response) => response.json())
      .then((data) => setProduct(data))  // update state with fetched product data
      .catch((error) => console.error('Error fetching product:', error));
  }, []);

  if (!product) {
    return <Text>Loading...</Text>; // Show loading message while fetching
  }

  const SizeSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>Size:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(product.sizes) && product.sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeButton, selectedSize === size && styles.selectedButton]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={[styles.sizeButtonText, selectedSize === size && styles.selectedButtonText]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const ColorSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>Color:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(product.colors) && product.colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color.toLowerCase() },
              selectedColor === color && styles.selectedColorButton,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const ReviewItem = ({ review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{review.user}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={[styles.star, star <= review.rating && styles.starFilled]}>
            ★
          </Text>
        ))}
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  const RelatedItem = ({ item }) => (
    <View style={styles.relatedItem}>
      <Image source={{ uri: item.image }} style={styles.relatedItemImage} />
      <Text style={styles.relatedItemName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.relatedItemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, isWeb && styles.webContent]}>
        {/* Displaying a single product image */}
        <Image
          source={{ uri: product.image }}
          style={[styles.productImage, { width: imageWidth, height: imageWidth }]}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>{product.brand || 'No Brand Available'}</Text>
          <Text style={styles.name}>{product.title || 'No Title Available'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.starFilled}>★</Text>
            <Text style={styles.rating}>{product.rating?.rate || 'N/A'}</Text>
            <Text style={styles.reviews}>({product.rating?.count || 0} reviews)</Text>
          </View>
          <Text style={styles.price}>${product.price?.toFixed(2) || 'N/A'}</Text>
          <SizeSelector />
          <ColorSelector />
          <Text style={styles.description}>{product.description}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {Array.isArray(product.reviews) && product.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Related Items</Text>
            {Array.isArray(product.relatedItems) && (
              <FlatList
                data={product.relatedItems}
                renderItem={({ item }) => <RelatedItem item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  webContent: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  productImage: {
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starFilled: {
    fontSize: 18,
    color: '#FFD700',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: '#000',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  relatedItem: {
    marginRight: 16,
    width: 120,
    alignItems: 'center',
  },
  relatedItemImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  relatedItemName: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  relatedItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
});

export default ItemDetailsScreen;


