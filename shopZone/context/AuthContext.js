// import React, { createContext, useState, useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import { Platform } from 'react-native';

// // Create the AuthContext
// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to get token based on platform
//   const getToken = async () => {
//     if (Platform.OS === 'web') {
//       return localStorage.getItem('userToken');
//     } else {
//       return await SecureStore.getItemAsync('userToken');
//     }
//   };

//   // Function to save token based on platform
//   const saveToken = async (jwtToken) => {
//     if (Platform.OS === 'web') {
//       localStorage.setItem('userToken', jwtToken);
//     } else {
//       await SecureStore.setItemAsync('userToken', jwtToken);
//     }
//   };

//   // Function to remove token based on platform
//   const removeToken = async () => {
//     if (Platform.OS === 'web') {
//       localStorage.removeItem('userToken');
//     } else {
//       await SecureStore.deleteItemAsync('userToken');
//     }
//   };

//   // Check if a token exists in SecureStore/localStorage on initial app load
//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const storedToken = await getToken();
//         if (storedToken) {
//           setToken(storedToken);
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error('Failed to load token from storage:', error);
//       }
//       setIsLoading(false);
//     };

//     loadToken();
//   }, []);

//   // Login function to save the token
//   const login = async (jwtToken) => {
//     try {
//       await saveToken(jwtToken);
//       setToken(jwtToken);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error('Failed to save token to storage:', error);
//     }
//   };

//   // Logout function to remove the token
//   const logout = async () => {
//     try {
//       await removeToken();
//       setToken(null);
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error('Failed to delete token from storage:', error);
//     }
//   };

//   // Context value that will be provided to consumers
//   const authContextValue = {
//     token,
//     isLoggedIn,
//     login,
//     logout,
//     isLoading,
//   };

//   // Render the AuthProvider with the value of the context
//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;




// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();  // Named export

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
   // Function to get token based on platform
   const getToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('userToken');
    } else {
      return await SecureStore.getItemAsync('userToken');
    }
  };

  // Function to save token based on platform
  const saveToken = async (jwtToken) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('userToken', jwtToken);
    } else {
      await SecureStore.setItemAsync('userToken', jwtToken);
    }
  };

  // Function to remove token based on platform
  const removeToken = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('userToken');
    } else {
      await SecureStore.deleteItemAsync('userToken');
    }
  };


  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (jwtToken) => {
    await saveToken(jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setIsLoggedIn(false);
  };

  const authContextValue = { token, isLoggedIn, login, logout, isLoading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
  // return (
  //   <AuthContext.Provider value={authContextValue}>
  //     {!isLoading ? <Text>AuthProvider Test - No children</Text> : <Text>Loading...</Text>}
  //   </AuthContext.Provider>
  // );
  
  
};

export default AuthProvider;  // Default export

