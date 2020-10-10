import React, { useState, useEffect } from 'react';
import * as db from '../firebase';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      db.chechAuth((user) => {
        setLoading(false);
        setUser(user);
      });
    };

    return checkAuth();
  }, []);

  return { user, loading };
}

export default useAuth;
