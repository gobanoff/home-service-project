import { PropsWithChildren, createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { LoginResponse, User } from "@/components/user/types";

const UserContext = createContext<{
  user: User | null;
  isLoggedIn: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
}>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [, setToken] = useLocalStorage<string | null>("token", null);

  const isLoggedIn = !!user;

  const login = (loginResponse: LoginResponse) => {
    console.log(loginResponse);
    setUser(loginResponse.user); // nustaciau i localstorage user
    setToken(loginResponse.token); // nustaciau i localstorage token
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };