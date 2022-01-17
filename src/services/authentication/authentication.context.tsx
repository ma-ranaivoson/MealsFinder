import React from 'react';
import loginRequest from './authentication.service';

interface AuthenticationCtx {
  user: object | null;
  isLoading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => void;
}

export const AuthenticationContext = React.createContext<AuthenticationCtx>({
  user: null,
  isLoading: false,
  error: null,
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => null,
});

export function AuthenticationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<object | null>(null);
  const [error, setError] = React.useState<null | string>(null);

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        const err = e as Error;
        setError(`Error name: ${err.name}\nError message: ${err.message}`);
        throw new Error(`Error name: ${err.name}\nError message: ${err.message}`);
      });
  };

  const value = React.useMemo(
    () => ({
      user,
      error,
      isLoading,
      onLogin,
    }),
    [user, error, isLoading, onLogin],
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
