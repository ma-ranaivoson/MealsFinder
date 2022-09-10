import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  UserCredential, getAuth, onAuthStateChanged, User, signOut,
} from '@firebase/auth';
import { loginRequest, register } from './authentication.service';

interface AuthenticationCtx {
  user: null | User;
  userCredentials : null | UserCredential;
  isLoading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => void;
  isAuthenticated: null | boolean;
  onRegister: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string,
    // eslint-disable-next-line no-unused-vars
    repeatedPassword: string
  ) => void;
  onSignOut: () => void;
}

export const AuthenticationContext = React.createContext<AuthenticationCtx>({
  user: null,
  userCredentials: null,
  isLoading: false,
  error: null,
  // eslint-disable-next-line no-unused-vars
  onLogin: (email: string, password: string) => null,
  isAuthenticated: false,
  // eslint-disable-next-line no-unused-vars
  onRegister: (email: string, password: string, repeatedPassword: string) => null,
  onSignOut: () => null,
});

export function AuthenticationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<null | User>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<null | boolean>(
    null,
  );
  const [error, setError] = React.useState<null | string>(null);
  const [userCredentials, setUserCredentials] = React.useState<UserCredential | null>(null);
  const auth = getAuth();

  const getCurrentUser = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
  };

  const loadLocalUser = async () => {
    getCurrentUser();
  };

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        getCurrentUser();
        setUserCredentials(u);
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
        getCurrentUser();
        setUserCredentials(u);
        setIsLoading(false);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(`${e.message}`);
        setTimeout(() => setError(null), 5000);
      });
  };

  const onSignOut = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      setIsLoading(false);
      setIsAuthenticated(false);
      setUser(null);
    }).catch((err) => {
      setIsLoading(false);
      setUser(null);
      setError(`${err.message}`);
      setIsAuthenticated(false);
    });
  };

  const value = React.useMemo(
    () => ({
      user,
      userCredentials,
      error,
      isLoading,
      isAuthenticated,
      onLogin,
      onRegister,
      onSignOut,
    }),
    [user, userCredentials, error, isLoading, isAuthenticated, onLogin, onRegister, onSignOut],
  );

  React.useEffect(() => {
    loadLocalUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
