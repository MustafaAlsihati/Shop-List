import Currencies from '../constants/Currencies';
import * as Notifications from 'expo-notifications';

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export const filterCurrencies = (currency, term) => {
  term = term.toLowerCase();

  const code = currency.code && currency.code.toLowerCase().includes(term);
  const name = currency.name && currency.name.toLowerCase().includes(term);
  const symbol =
    currency.symbol && currency.symbol.toLowerCase().includes(term);

  return code || name || symbol;
};

export const sendPushNotification = async (expoPushToken, content) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: content.title,
    body: content.body,
    data: {
      data: content.data,
    },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
