import React from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  FormTextInput,
  AuthButton,
  TextError,
  Title,
} from '../components/AccountStyles';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {
    error, isAuthenticated, onLogin, isLoading,
  } = React.useContext(
    AuthenticationContext,
  );

  const handlePress = () => {
    if (!email && !password) return;

    onLogin(email, password);

    if (isAuthenticated) {
      navigation.navigate('Restaurant');
    }
  };

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals Finder</Title>
      <AccountContainer>
        <FormTextInput
          label="Email"
          value={email}
          dense
          onChangeText={(text) => setEmail(text)}
        />
        <FormTextInput
          label="Password"
          value={password}
          dense
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {error && <TextError>{error}</TextError>}
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={handlePress}
          loading={isLoading}
          style={{ marginTop: 8 }}
        >
          Login
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
}
