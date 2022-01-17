import React from 'react';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

export default function Navigation() {
  const { isAuthenticated } = React.useContext(AuthenticationContext);

  return isAuthenticated ? (
    <AppNavigator />
  ) : (
    <AccountNavigator />
  );
}
