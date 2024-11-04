import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Heart, Share2 } from 'lucide-react-native'
import GoBackButton from '../../components/GoBackButton'

const ItemDetails = () => {
  const navigation = useNavigation()
  const { itemId } = useLocalSearchParams()

  useEffect(() => {
    navigation.setOptions({
    title:"item details",
      headerRight: () => <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerRightIcons}><Share2 color="black" /></TouchableOpacity>
        <TouchableOpacity style={styles.headerRightIcons}><Heart color="black" /></TouchableOpacity>
      </View>
      , headerLeft: () => <GoBackButton />,
      headerTitleAlign: "center"

    })
  }, [])


  return (
    <View>
      <Text>ItemDetails  {itemId}</Text>
    </View>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 70,
    ...Platform.OS === "web" && { width: 100 }
  },
  headerRightIcons: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#F2F2F2"
  }

})