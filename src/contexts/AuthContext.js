import React, { useState, useEffect, createContext } from 'react';
import { db, auth } from '../firebase';

export const AuthContext = createContext({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection('users')
            .doc(user.uid)
            .onSnapshot(
              (doc) => {
                setUser({ ...doc.data(), uid: user.uid });
                setLoading(false);
              },
              (err) => {
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

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
