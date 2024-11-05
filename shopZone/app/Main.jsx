import { Stack } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import { Platform } from "react-native";
import Api from "../service/Api";
import axios from "axios";
// Import usePushNotifications only if not web
import { usePushNotifications } from "../service/notificationService";

export default function Main() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const [expoToken, setExpoToken] = useState(null);
  const expoPushToken = Platform.OS !== 'web' ? usePushNotifications().expoPushToken : null;

  useEffect(() => {
    if (expoPushToken && isLoggedIn) {
      setExpoToken(expoPushToken);
    }
  }, [expoPushToken, isLoggedIn]);

  useEffect(() => {
    if (expoToken && isLoggedIn) {

      const updateUserToken = async () => {
        console.log(Api.updateToken)
        try {
          await axios.post(
            Api.updateToken,
            { expoToken },
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
  }, [expoToken, isLoggedIn, token]);

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