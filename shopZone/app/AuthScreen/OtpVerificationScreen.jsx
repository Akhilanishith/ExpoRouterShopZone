


// import React, { useState, useRef, useContext } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
// import Api from '../../service/Api';
// import axios from 'axios';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { AuthContext } from '../../context/AuthContext';

// const OtpVerificationScreen = () => {
//   const { login } = useContext(AuthContext);
//   const { number, emailEmpty, emailExists } = useLocalSearchParams();
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [email, setEmail] = useState('');
//   const inputRefs = useRef([]);
//   const router = useRouter();

//   // Convert emailEmpty and emailExists to boolean
//   const emailEmptyBool = emailEmpty === 'true';
//   const emailExistsBool = emailExists === 'true';

// //   // useEffect to check whenever number, emailEmpty, or emailExists changes
// //   useEffect(() => {
// //     console.log('Number:', number);
// //     console.log('Email Exists:', emailExistsBool);
// //     console.log('Email Empty:', emailEmptyBool);
// //   }, [number, emailExistsBool, emailEmptyBool]);

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value !== '' && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (index) => {
//     if (index > 0 && otp[index] === '') {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (number.length !== 10) {
//       Alert.alert('Invalid phone number.');
//       return;
//     }

//     const enteredOtp = otp.join('');
//     if (enteredOtp.length !== 4) {
//       Alert.alert('Please enter the 4-digit OTP.');
//       return;
//     }

//     if (emailEmptyBool && !email) {
//       Alert.alert('Please enter your email.');
//       return;
//     }

//     try {
//       const response = await axios.post(Api.otpValidation, {
//         number,
//         otp: enteredOtp,
//         email: emailExistsBool ? undefined : email,
//       });

//       const result = response.data;

//       if (result.success) {
//         login(result.token);

//         if (result.isSeller) {
//           router.push('/SellerComponent');
//         } else {
//           router.push('/(userTabs)');
//         }
//       } else {
//         Alert.alert(result.message);
//       }
//     } catch (error) {
//       Alert.alert('Invalid OTP or validation error.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>OTP Verification</Text>

//       {!emailExistsBool && emailEmptyBool && (
//         <TextInput
//           style={styles.emailInput}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//       )}

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpInput}
//             value={digit}
//             onChangeText={(value) => handleOtpChange(value, index)}
//             keyboardType="numeric"
//             maxLength={1}
//             ref={(ref) => (inputRefs.current[index] = ref)}
//             onKeyPress={({ nativeEvent }) => {
//               if (nativeEvent.key === 'Backspace') {
//                 handleBackspace(index);
//               }
//             }}
//           />
//         ))}
//       </View>

//       <Text style={styles.subtitle}>OTP sent to {number}</Text>

//       <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
//         <Text style={styles.verifyButtonText}>Verify OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OtpVerificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 30,
//     color: '#333',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginBottom: 30,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 2,
//     borderColor: '#000',
//     borderRadius: 10,
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   emailInput: {
//     width: '80%',
//     height: 50,
//     borderWidth: 2,
//     borderColor: '#000',
//     borderRadius: 10,
//     fontSize: 18,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   verifyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//   },
//   verifyButtonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Api from '../../service/Api';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const OtpVerificationScreen = () => {
  const { login } = useContext(AuthContext);
  const { number, emailEmpty, emailExists } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const router = useRouter();

  const emailEmptyBool = emailEmpty === 'true';
  const emailExistsBool = emailExists === 'true';

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (number.length !== 10) {
      Alert.alert('Invalid phone number.');
      return;
    }

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Alert.alert('Please enter the 4-digit OTP.');
      return;
    }

    if (emailEmptyBool && !email) {
      Alert.alert('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post(Api.otpValidation, {
        number,
        otp: enteredOtp,
        email: emailExistsBool ? undefined : email,
      });

      const result = response.data;

      if (result.success) {
        login(result.token);

        if (result.isSeller) {
          router.push('/SellerComponent');
        } else {
          router.push('/(userTabs)');
        }
      } else {
        Alert.alert(result.message);
      }
    } catch (error) {
      Alert.alert('Invalid OTP or validation error.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🛫</Text>
            </View>
          </View>
          
          <Text style={styles.title}>Password Reset</Text>
          
          <Text style={styles.subtitle}>
            We sent a code to {number ? `${number.slice(0, 3)}****${number.slice(7)}` : 'your phone'}
          </Text>

          {!emailExistsBool && emailEmptyBool && (
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          )}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
            <Text style={styles.verifyButtonText}>Verify & Continue</Text>
          </TouchableOpacity>
<Text style={styles.subtitle}>OTP sent to {number}</Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Didn't receive OTP? Resend Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: isWeb ? Math.min(400, width - 40) : '100%',
    maxWidth: 400,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    width: '22%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#F9F9F9',
  },
  emailInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  verifyButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#0066FF',
    fontSize: 14,
  },
});

export default OtpVerificationScreen;