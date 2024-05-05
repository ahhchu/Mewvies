// LoginContext.js
import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <LoginContext.Provider value={{ loginPopupOpen, openLoginPopup, closeLoginPopup }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return React.useContext(LoginContext);
};
