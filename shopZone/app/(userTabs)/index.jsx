import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, Search, ShoppingBag } from 'lucide-react-native';
import ProductCard from '../../components/ProductCard';
import { router } from 'expo-router';

export default function index() {
  const id  = 777777777777
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ShoppingBag size={24} color="#000" />
        <Bell size={24} color="#000" />
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: '/placeholder.svg?height=150&width=300' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Super Sale Discount</Text>
          <Text style={styles.bannerSubtitle}>Up to 50%</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal style={styles.categoriesContainer}>
        {['Shoes', 'Beauty', "Women's Fashion", 'Jewelry', "Men's Fashion"].map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.specialSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special For You</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <View style={styles.productGrid}>

          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />

          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />
          <ProductCard onPress={()=>router.push(`../itemDetail/${id}`)} />


        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  shopNowButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
  specialSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#999',
  },
  productGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    gap: 10,

  },

});