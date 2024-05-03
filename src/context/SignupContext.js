// SignupContext.js
import React, { createContext, useState } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [signupPopupOpen, setSignupPopupOpen] = useState(false);

  const openSignupPopup = () => {
    setSignupPopupOpen(true);
  };

  const closeSignupPopup = () => {
    setSignupPopupOpen(false);
  };

  return (
    <SignupContext.Provider value={{ signupPopupOpen, openSignupPopup, closeSignupPopup }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  return React.useContext(SignupContext);
};
