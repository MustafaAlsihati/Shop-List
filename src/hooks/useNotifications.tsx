import { useState, useEffect, useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';
import * as Notifications from 'expo-notifications';
import { db } from '../firebase';
import { Platform } from 'react-native';
import { ReduxState } from '../constants/types';
import { useSelector } from 'react-redux';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useNotifications() {
  const { user } = useSelector((state: ReduxState) => ({ user: state.User }));
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  const registerForPushNotificationsAsync = useCallback(async () => {
    const uid = user?.uid;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      let _token = await Notifications.getExpoPushTokenAsync();
      const token = _token.data;

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (!isEmpty(uid)) {
        await db.collection('users').doc(uid).update({
          expo_push_token: token,
        });
      }

      return token;
    } catch (error) {
      console.log('ERR @ registerForPushNotifications\n', error.message);
    }
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification =>
      setNotification(notification && !isEmpty(notification))
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener as any);
      Notifications.removeNotificationSubscription(responseListener as any);
    };
  }, [user]);

  return { expoPushToken, notification };
}
