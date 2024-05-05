import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence); // Set persistence

    const unsubscribe = onAuthStateChanged(auth, user => {
         console.log("Auth state changed: ", user)
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
