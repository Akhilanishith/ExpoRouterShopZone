import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import Api from "../../service/Api";
import useFetchCustomHook from "../../hooks/useFetchCustomHook";
import { AuthContext } from "../../context/AuthContext";

export default function CategoryScreen() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { data, loading, error } = useFetchCustomHook(Api.getCategories, token);

  const handleNavigateToSubcategory = (categoryId, categoryName) => {
    router.push({
      pathname: "../CategorySection/SubCategoriesScreen",
      params: { categoryId: categoryId.toString(), categoryName },
    });
  };

  const handleSeeAllCategories = () => {
    router.push("../CategorySection/AllCategoriesScreen");
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    alert(error);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        {Platform.OS === "android" && (
          <TouchableOpacity onPress={handleSeeAllCategories}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        // data={data.slice()} // Show only a few categories in the main screen
        data={data ? data.slice() : []} 
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigateToSubcategory(item._id, item.name)}
            style={styles.categoryItem}
          >
            <View style={styles.categoryCircle}>
              {item.imageUrl ? (
                <Image
                  source={{ uri: Api.main + "/" + item.imageUrl }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.categoryIcon}>📁</Text>
              )}
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  seeAll: { fontSize: 16, color: "#007bff" }, // Styling for the "See All" button
  flatListContent: { alignItems: "center" },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryCircle: {
    width: 70, // Increased slightly to allow for the inner border
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Adds a subtle shadow on Android for a floating effect
  },
  categoryImage: {
    width: 62, // Smaller than categoryCircle to accommodate white border
    height: 62,
    borderRadius: 31,
    borderWidth: 2, // White border width
    borderColor: "#ffffff", // White border color
  },
  categoryIcon: { fontSize: 24 },
  categoryName: { fontSize: 14, textAlign: "center" },
});