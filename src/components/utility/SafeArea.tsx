import styled from 'styled-components/native';
import { SafeAreaView, StatusBar } from 'react-native';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}`}
`;

export default SafeArea;
