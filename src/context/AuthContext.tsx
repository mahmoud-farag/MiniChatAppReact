 /* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { IUser } from '../libs/interfaces';

interface IAuthContext {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: { accessToken: string; userData: IUser }) => void;
  logout: () => void;
  updateAuthData: (updates: { accessToken?: string; userData?: IUser }) => void;
}


const AuthContext = createContext<IAuthContext | null>(null);


function AuthProvider({ children }: { children: React.ReactNode }) {

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
  };

  const logout = (): void => {
    setCurrentUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
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

/**
 * Custom hook to access authentication context.
 *
 * Must be used within an {@link AuthProvider}.
 *
 * @throws {Error} If used outside AuthProvider
 *
 * @returns {IAuthContext} Auth context values and actions
 * @returns {IUser | null} returns.currentUser - Currently authenticated user data or null
 * @returns {boolean} returns.isAuthenticated - Whether the user is authenticated
 * @returns {boolean} returns.isLoading - Indicates ongoing auth-related operations
 * @returns {Function} returns.setIsLoading - Updates loading state
 * @returns {Function} returns.login - Logs in the user and persists auth data
 * @returns {Function} returns.logout - Logs out the user and clears stored auth data
 * @returns {Function} returns.updateAuthData - Updates access token and/or user data
 */
function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;


}


export { AuthProvider, useAuth };



























