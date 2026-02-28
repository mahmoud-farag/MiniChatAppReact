 /* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { IUser } from '../../libs/interfaces';
import useRealTimeStore from '../zustand/useRealTimeStore';

export interface IAuthContext {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: { accessToken: string; userData: IUser }) => void;
  logout: () => void;
  updateAuthData: (updates: { accessToken?: string; userData?: IUser }) => void;
}


export const AuthContext = createContext<IAuthContext | null>(null);


export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    return Boolean(accessToken && storedUser);
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);




  const login = ({ accessToken, userData }: { accessToken: string; userData: IUser }): void => {
    setCurrentUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // connect to socket
    useRealTimeStore.getState().connect(true);
  };

  const logout = (): void => {
    setCurrentUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    //disconnect from socket
    useRealTimeStore.getState().disconnect();
  };


  const updateAuthData = ({ accessToken, userData }: { accessToken?: string; userData?: IUser }): void => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (userData) {
      const updatedUserData = { ...currentUser, ...userData };
      setCurrentUser(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    }
  };

  const authContextValue: IAuthContext = {
    currentUser,
    isAuthenticated,
    isLoading,
    setIsLoading,
    login,
    logout,
    updateAuthData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );

}































