import React, { useEffect, useCallback } from 'react';
import { store } from '.';
import { User } from '../constants/types';
import firebase, { db, auth } from '../firebase';
import { SET_USER } from './reducers/User';

interface Props {
  setLoading: (v: boolean) => void;
  setUser: (u: User | null) => void;
  children: React.ReactNode;
}

export default function AuthProvider({ children, setLoading, setUser }: Props) {
  const getUserInfo = useCallback(async (user: firebase.User | null) => {
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data() as User;
            const _user: User = { ...data, uid: user.uid };
            store.dispatch({
              type: SET_USER,
              user: _user,
            });
            setUser(_user);
          } else {
            setUser(null);
          }
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const sub = auth.onAuthStateChanged(user => {
      if (user) {
        getUserInfo(user);
      } else {
        setTimeout(function () {
          if (user) {
            getUserInfo(user);
          } else {
            setUser(null);
            setLoading(false);
          }
        }, 5000);
      }
    });

    return () => sub();
  }, []);

  return <>{children}</>;
}
