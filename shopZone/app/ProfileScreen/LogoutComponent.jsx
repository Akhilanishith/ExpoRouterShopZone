// import { StyleSheet, Text, View } from 'react-native';
// import React, { useContext } from 'react';
// import { CustomButton } from '../../components/ActionComponents';
// import { AuthContext } from '../../context/AuthContext';
// import { useRouter } from 'expo-router';

// const LogoutComponent = () => {
//   const router = useRouter(); // Use expo-router's hook for navigation
//   const { logout } = useContext(AuthContext);

//   const handleLogout = async () => {
//     await logout(); // Ensure state updates to `false`
//     router.replace('/index'); // Use replace to navigate without stacking routes
//   };
  

//   return (
//     <View style={styles.container}>
//       <CustomButton title="Logout" onClick={handleLogout} />
//     </View>
//   );
// };

// export default LogoutComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });




import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { CustomButton } from '../../components/ActionComponents';
import { AuthContext } from '../../context/AuthContext';


const LogoutComponent = () => {
  const { logout } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <CustomButton 
        title="Logout" 
        onclick={logout}
      />
      {/* Add the Link to navigate to the Home screen after logout */}
      
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