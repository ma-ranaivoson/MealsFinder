import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';
import Loader from '../../components/loader/Loader';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

export default function Navigation() {
  const { isAuthenticated } = React.useContext(AuthenticationContext);
  const screen = isAuthenticated ? <AppNavigator /> : <AccountNavigator />;

  return (
    <NavigationContainer>
      {isAuthenticated === null ? <Loader /> : screen}
    </NavigationContainer>
  );
}
