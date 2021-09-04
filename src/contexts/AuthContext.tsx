import React, { useState, useEffect, createContext, useCallback } from 'react';
import firebase, { db, auth } from '../firebase';
export const AuthContext = createContext({
  user: null,
  loading: true,
} as {
  user: firebase.User | null;
  loading: boolean;
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = React.memo<Props>(({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = useCallback((user: any) => {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(
        doc => {
          setUser({ ...doc.data(), uid: user.uid } as firebase.User);
          setLoading(false);
        },
        err => {
          console.log('ERR @ AuthContext:\n\n', err.message);
        }
      );
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

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
});
