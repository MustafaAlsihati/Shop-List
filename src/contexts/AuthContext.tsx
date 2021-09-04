import React, { useState, useEffect, createContext } from 'react';
import { db, auth } from '../firebase';

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

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () =>
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection('users')
            .doc(user.uid)
            .onSnapshot(
              doc => {
                setUser({ ...doc.data(), uid: user.uid } as firebase.User);
                setLoading(false);
              },
              err => {
                console.log('ERR @ AuthContext:\n\n', err.message);
              }
            );
        } else {
          setUser(null);
          setTimeout(() => setLoading(false), 1500);
        }
      });

    return checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
