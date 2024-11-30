import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import ProductsComponent from './ProductsComponent';
import Header from './header';
import WebNavBar from './../../components/WebNavBar';
import { useNavigation } from 'expo-router';
import Category from './Category';

import WebCarouselComponent from '../../components/WebCarouselComponent';
import FoodZoneExplorer from './WebFoodZoneHeader';

const home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <WebNavBar />
      <FoodZoneExplorer/>
      <WebCarouselComponent />
      <Category/>
      <ProductsComponent />
    </ScrollView>
  )
}

export default home