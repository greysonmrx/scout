import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  type: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(user: User): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    function loadStorageData(): void {
      const token = localStorage.getItem('@Scout:token');
      const user = localStorage.getItem('@Scout:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user: JSON.parse(user) });
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(({ email, password }) => new Promise((resolve, reject) => {
    api.post('/sessions', { email, password })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem('@Scout:token', token);
        localStorage.setItem('@Scout:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  }), []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@Scout:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [setData, data.token]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Scout:user');
    localStorage.removeItem('@Scout:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user, signIn, updateUser, signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
