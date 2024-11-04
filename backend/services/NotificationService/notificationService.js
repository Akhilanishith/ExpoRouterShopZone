import { Expo } from 'expo-server-sdk';
const expo = new Expo();
const sendNotification = async (token,msgTitle,msgBody) => {
console.log(token,msgTitle,msgBody)
    const to = token;
    const title = msgTitle;
    const body = msgBody;
    const data = { someData: 'goes here' };

    if (!Expo.isExpoPushToken(to)) {
        console.error(`Push token ${to} is not a valid Expo push token`);
        return
    }

    const messages = [{
        to,
        sound: 'default',
        title,
        body,
        data,
    }];

    try {
        let ticketChunk = await expo.sendPushNotificationsAsync(messages);
        console.log(ticketChunk)
    } catch (error) {
        console.error(error)
    }

};


export default sendNotification