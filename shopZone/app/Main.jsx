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
      <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
    </Stack>
  );
}