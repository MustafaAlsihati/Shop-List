import React, { useState, useEffect, useRef, createContext } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { auth, db } from '../firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NotificationsProvider = ({ children, user }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => setNotification(notification)
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => console.log('NotificationListener:\n', response)
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [user]);

  return (
    <NotificationsContext.Provider value={{ expoPushToken, notification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

const registerForPushNotificationsAsync = async () => {
  const uid = auth.currentUser.uid;
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return;
  }

  try {
    let token = await Notifications.getExpoPushTokenAsync();
    token = token.data;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (uid) {
      await db
        .collection('users')
        .doc(uid)
        .update({
          expo_push_token: token,
        })
        .catch((err) =>
          console.log('ERR @ registerForPushNotificationsAsync\n', err.message)
        );
    }

    return token;
  } catch (error) {
    console.log('ERR @ registerForPushNotifications\n', error);
  }
};

export const NotificationsContext = createContext({
  expoPushToken: '',
  notification: false,
});
