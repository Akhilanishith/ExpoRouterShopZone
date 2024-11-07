import { Stack } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import { Platform } from "react-native";
import Api from "../service/Api";
import axios from "axios";

export default function Main() {
  const { isLoggedIn, token,expoPushToken } = useContext(AuthContext);

  useEffect(() => {
    if (expoPushToken && isLoggedIn) {
   
        console.log(expoPushToken)
        const updateUserToken = async () => {
          try {
            await axios.post(
              Api.updateToken,
              { expoToken: expoPushToken },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Token updated successfully");
          } catch (error) {
            console.error("Failed to update token", error);
          }
        };
        updateUserToken();
      }
    
  }, [expoPushToken, isLoggedIn]);



  return (
    <Stack>
      {/* Define the screens within your Stack */}
      <Stack.Screen name="AuthScreen/AuthScreen" options={{ headerShown: false }} />
      <Stack.Screen name="AuthScreen/OtpVerificationScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen/ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SellerScreen/SellerDashboard/SellerDashboard" options={{ headerShown: false }} />
    </Stack>
  );
}