
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';


const LogoutComponent = () => {
  const { logout } = useContext(AuthContext);


  return (
    <View style={styles.container}>

     <CustomButton title="L O G O U T" onPress={logout}/>
      
    </View>
  );
};

export default LogoutComponent;

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    fontWeight: 'bold',
    
  },
});