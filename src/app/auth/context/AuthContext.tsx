import React, { createContext } from 'react';
import { useLocalStorage } from '@farmtech/shared';
import { jwtDecode } from 'jwt-decode';
import { notifications } from '@mantine/notifications';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (access: string, refresh?: string, user?: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setStoredUser] = useLocalStorage('user', null);
  const [token, setStoredToken] = useLocalStorage('access', null);
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh', null);

  const parseUser = (token: string) => {
    const parsedUser = jwtDecode(token);
    setStoredUser(parsedUser);
  };

  const login = (access: string, refresh?: string, user?: User) => {
    setStoredToken(access);
    setStoredUser(user);
    // parseUser(access);
    if (refresh) {
      setRefreshToken(refresh);
    }
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
