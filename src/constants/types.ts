import firebase from '../firebase';
import { CurrencyType } from './Currencies';

export type List = {
  author?: string;
  created?: firebase.firestore.Timestamp | Date;
  description?: string;
  image?: string;
  list_id: string;
  name: string;
  search_term?: string;
  userIds?: string[];
  users?: { id: string; name: string }[];
};

export type Item = {
  author?: {
    id: string;
    username: string;
  };
  created?: firebase.firestore.Timestamp | Date;
  currency_code?: string;
  description?: string;
  image?: string;
  list_id: string;
  item_id: string;
  name: string;
  price?: number;
  search_term?: string;
};

export type User = {
  created: firebase.firestore.Timestamp | Date;
  email: string;
  image?: string;
  expo_push_token?: string;
  settings?: Settings;
  uid: string;
  username: string;
};

export type Settings = {
  currency?: CurrencyType;
};
