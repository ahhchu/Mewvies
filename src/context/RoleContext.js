import { createContext } from "react";

const RoleContext = createContext({
  isAdmin: false,
  setIsAdmin: () => {},
});

export default RoleContext;
