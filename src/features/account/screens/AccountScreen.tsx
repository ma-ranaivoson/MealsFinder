import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from '../components/AccountStyles';

const AnimationWrapper = styled.View`
  position: absolute;
  width: 100%;
  z-index: 999;
  height: 40%;
  top: 30px;
`;

export default function AccountScreen({ navigation }: { navigation: any }) {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          autoPlay
          loop
          resizeMode="cover"
        // eslint-disable-next-line global-require
          source={require('../../../../assets/watermelon.json')}
        />
      </AnimationWrapper>
      <Title>Meals Finder</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <AuthButton
          icon="email"
          mode="contained"
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
}
