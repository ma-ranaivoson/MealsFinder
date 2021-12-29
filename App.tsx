import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import RestaurantsScreen from './src/features/restaurants/screens/RestaurantsScreen';

import theme from './src/infrastructure/theme/theme';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      <ExpoStatusBar hidden={false} />
    </>
  );
}
