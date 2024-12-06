// hooks/useSetTitle.js
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';// Import the GoBackButton component
import GoBackButton from '../components/GoBackButton';

const useSetTitle = (title, centered = true) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title,
      headerTitleAlign: centered ? 'center' : 'left', // Center title if `centered` is true
      headerLeft: () => <GoBackButton />, // Set GoBackButton as the header left component kkk
    });
  }, [navigation, title, centered]);
};

export default useSetTitle;
