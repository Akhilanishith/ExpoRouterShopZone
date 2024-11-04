// import { useState, useEffect, useRef } from "react";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import { Platform } from "react-native";

// export const usePushNotifications = () => {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldPlaySound: true,
//       shouldShowAlert: true,
//       shouldSetBadge: true,
//     }),
//   });

//   const [expoPushToken, setExpoPushToken] = useState();

//   const [notification, setNotification] = useState();

//   const notificationListener = useRef();
//   const responseListener = useRef();

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification");
//         return;
//       }

//       token = await Notifications.getExpoPushTokenAsync({
//         projectId: Constants.expoConfig?.extra?.eas.projectId,
//       });
//     } else {
//       alert("Must be using a physical device for Push notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => {
//       setExpoPushToken(token);
//     });

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return {
//     expoPushToken,
//     notification,
//   };
// };


import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export const usePushNotifications = () => {
  // Configure the notification handler settings for received notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState(null); // State to hold Expo Push Token
  const [notification, setNotification] = useState(null); // State to hold incoming notification data

  const notificationListener = useRef();
  const responseListener = useRef();

  // Function to register for push notifications and get the Expo Push Token
  async function registerForPushNotificationsAsync() {
    let token;

    // Check if the device is physical, as push notifications don't work on simulators/emulators
    if (Device.isDevice) {
      // Check for existing notification permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permission if not granted
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // If permission is still not granted, alert the user and exit function
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      // Try to get the Expo Push Token with projectId if it's available
      try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        if (!projectId) {
          console.warn("Expo projectId is undefined in Constants.expoConfig.extra.eas");
        }
        token = await Notifications.getExpoPushTokenAsync({ projectId });
        console.log("Expo push token:", token?.data);
      } catch (error) {
        console.error("Failed to get Expo push token:", error);
      }
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    // For Android, set notification channel
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token?.data; // Return only the token string
  }

  useEffect(() => {
    // Register for push notifications and save the token to state
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // Listen for incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // Listen for user interaction with the notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("User interaction with notification:", response);
    });

    // Clean up listeners on component unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
