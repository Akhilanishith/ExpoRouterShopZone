// hooks/multiActionButton.js
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';// Import the GoBackButton component
import GoBackButton from '../components/GoBackButton';

const multiActionButton = (title, centered = true ,buttons) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title,
      headerTitleAlign: centered ? 'center' : 'left', // Center title if `centered` is true
      headerLeft: () => <GoBackButton />, // Set GoBackButton as the header left component
      headerRight: () => buttons(), // Set GoBackButton as the
    });
  }, [navigation, title, centered]);
};

export default multiActionButton;
