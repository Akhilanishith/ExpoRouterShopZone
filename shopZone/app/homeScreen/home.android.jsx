import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "./header";
import CarouselComponent from "./carousel";
import Category from "./Category";
import ProductsComponent from "./ProductsComponent";

const home = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <StatusBar style="auto" />
      <Header />
      <ScrollView>
        <CarouselComponent />
        <Category />
        <ProductsComponent />
      </ScrollView>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
