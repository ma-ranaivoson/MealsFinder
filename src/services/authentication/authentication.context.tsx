import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserCredential } from '@firebase/auth';
import { loginRequest, register } from './authentication.service';

interface AuthenticationCtx {
  user: UserCredential | null;
  isLoading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => void;
  isAuthenticated: boolean;
  onRegister: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string,
    // eslint-disable-next-line no-unused-vars
    repeatedPassword: string
  ) => void;
}

export const AuthenticationContext = React.createContext<AuthenticationCtx>({
  user: null,
  isLoading: false,
  error: null,
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => null,
  isAuthenticated: false,
  // eslint-disable-next-line no-unused-vars
  onRegister: (email: string, password: string, repeatedPassword: string) => null,
});

export function AuthenticationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<UserCredential | null>(null);
  const [error, setError] = React.useState<null | string>(null);

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        const err = e as Error;
        setError(`${err.message}`);
        setIsAuthenticated(false);
        setIsLoading(false);
        setTimeout(() => setError(null), 5000);
      });
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setIsLoading(false);
      setError('Error: Passwords do not match');
      return;
    }
    register(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(`${e.message}`);
        setTimeout(() => setError(null), 5000);
      });
  };

  const value = React.useMemo(
    () => ({
      user,
      error,
      isLoading,
      isAuthenticated,
      onLogin,
      onRegister,
    }),
    [user, error, isLoading, isAuthenticated, onLogin, onRegister],
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
