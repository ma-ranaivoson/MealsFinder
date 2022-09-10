import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import colors from '../../../infrastructure/theme/colors';

export const AccountBackground = styled.ImageBackground.attrs({
  // eslint-disable-next-line global-require
  source: require('../../../../assets/home_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.Spacing.space[4]};
  margin-top: ${(props) => props.theme.Spacing.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 30px;
`;

export const FormTextInput = styled(TextInput).attrs({
  activeOutlineColor: colors.brand.primary,
  underlineColor: colors.brand.primary,
  activeUnderlineColor: colors.brand.primary,
  mode: 'outlined',
})`
  max-width: 400px;
  width: 250px;
  margin-bottom: 8px ;
`;

export const TextError = styled.Text`
  color: red;
  margin: 0 0 8px 0;
  max-width: 250px;
  font-family: Oswald_400Regular;
`;
