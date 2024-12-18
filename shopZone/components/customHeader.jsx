import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import GoBackButton from './GoBackButton';

const HeaderButtons = ({title, centered = true,}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title,
      headerTitleAlign: centered ? 'center' : 'left', // Center title if `centered` is true
      headerLeft: () => <GoBackButton />, // Set GoBackButton as the header left component
    });
  }, [navigation, title, centered]);
  return (
    <View>
      <TouchableOpacity>
        <Text>Search</Text>
        
      </TouchableOpacity>
    </View>
  )
}

export default HeaderButtons