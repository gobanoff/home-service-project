import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (user) => setUser(user);
  const logout = () => setUser(null);

  const register = (name, email, password) => {
    const userData = { name, email, password };
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };



  