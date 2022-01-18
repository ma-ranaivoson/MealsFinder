import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserCredential } from '@firebase/auth';
import loginRequest from './authentication.service';

interface AuthenticationCtx {
  user: UserCredential | null;
  isLoading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => void;
  isAuthenticated: boolean;
}

export const AuthenticationContext = React.createContext<AuthenticationCtx>({
  user: null,
  isLoading: false,
  error: null,
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => null,
  isAuthenticated: false,
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
        setError(`Error name: ${err.name}\nError message: ${err.message}`);
        setIsAuthenticated(false);
        throw new Error(
          `Error name: ${err.name}\nError message: ${err.message}`,
        );
      });
  };

  const value = React.useMemo(
    () => ({
      user,
      error,
      isLoading,
      isAuthenticated,
      onLogin,
    }),
    [user, error, isLoading, isAuthenticated, onLogin],
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
