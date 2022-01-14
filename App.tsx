import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
// eslint-disable-next-line camelcase
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
// eslint-disable-next-line camelcase
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { ThemeProvider } from 'styled-components/native';
import { RestaurantContextProvider } from './src/services/restaurants/restaurant.context';
import { LocationContextProvider } from './src/services/location/location.context';
import theme from './src/infrastructure/theme/theme';
import Navigation from './src/infrastructure/navigation/Navigation';

export default function App() {
  const [oswaldLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Oswald_400Regular,
  });
  const [latoLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Lato_400Regular,
  });

  if (!oswaldLoaded && !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationContextProvider>
          <RestaurantContextProvider>
            <Navigation />
          </RestaurantContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar hidden={false} />
    </>
  );
}
