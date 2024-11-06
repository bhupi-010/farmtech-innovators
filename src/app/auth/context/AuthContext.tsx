import React, { createContext } from 'react';
import { useLocalStorage } from '@farmtech/shared';
import { jwtDecode } from 'jwt-decode';
import { notifications } from '@mantine/notifications';

interface User {
  id: number;
  email: string;
  mobileNumber: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setStoredUser] = useLocalStorage('user', null);
  const [token, setStoredToken] = useLocalStorage('token', null);

  const roleKey = user?.role?.key;

  const parseUser = (token: string) => {
    const parsedUser = jwtDecode(token);
    setStoredUser(parsedUser);
  };

  const login = (token: string) => {
    setStoredToken(token);
    parseUser(token);
  };

  const logout = () => {
    setStoredUser(null);
    setStoredToken(null);
    window.location.reload();
    notifications.show({
      color: 'green',
      title: 'Logged out!',
      message: 'Logged out sucessfully!!  ',
    });
  };

  const isAuthenticated = !!token;

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
