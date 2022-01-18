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

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatedPassword, setRepeatedPassword] = React.useState('');
  const {
    error, isAuthenticated, onRegister, isLoading,
  } = React.useContext(
    AuthenticationContext,
  );

  const handlePress = () => {
    if (!email && !password) return;

    onRegister(email, password, repeatedPassword);

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
        <FormTextInput
          label="Repeat password"
          value={repeatedPassword}
          dense
          onChangeText={(text) => setRepeatedPassword(text)}
          secureTextEntry
        />
        {error && <TextError>{error}</TextError>}
        <AuthButton
          icon="email"
          mode="contained"
          onPress={handlePress}
          loading={isLoading}
          style={{ marginTop: 8 }}
        >
          Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
}
