import React, { useState, useEffect, createContext } from 'react';
import { chechAuth } from '../firebase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      chechAuth((user) => {
        setLoading(false);
        setUser(user);
      });
    };

    return checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext({
  user: null,
  loading: true,
});
