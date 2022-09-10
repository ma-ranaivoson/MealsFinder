/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';

const Loader = styled(ActivityIndicator).attrs(() => ({
  color: 'tomato',
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Loader;
