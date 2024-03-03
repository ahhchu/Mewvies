import { createContext } from "react";

const UserContext = createContext({
  userData: {
    token: undefined,
    user: undefined,
  },
  setUserData: () => {},
});

export default UserContext;
