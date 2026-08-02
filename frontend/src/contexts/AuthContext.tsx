import {
  createContext,
  useState,
  useEffect,
} from "react";

import { storage } from "../utils/storage";
import type { AuthContextType, User } from "../types/auth";

export const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setToken(storage.getToken());
    setUser(storage.getUser());
  }, []);

  const login = (token: string, user: User) => {
    storage.setToken(token);
    storage.setUser(user);

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    storage.clear();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}