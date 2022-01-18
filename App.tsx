import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line camelcase
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
// eslint-disable-next-line camelcase
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { ThemeProvider } from 'styled-components/native';
import { RestaurantContextProvider } from './src/services/restaurants/restaurant.context';
import { LocationContextProvider } from './src/services/location/location.context';
import { FavoriteContextProvider } from './src/services/favorites/favorites.context';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import theme from './src/infrastructure/theme/theme';
import Navigation from './src/infrastructure/navigation/Navigation';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCXFt3r3ohb2fXTq_TnMRXms3BM8IDNs_w',
  authDomain: 'meals-finder-adf3e.firebaseapp.com',
  projectId: 'meals-finder-adf3e',
  storageBucket: 'meals-finder-adf3e.appspot.com',
  messagingSenderId: '1035594339462',
  appId: '1:1035594339462:web:d3888eb7bfd57c44f76d07',
};

initializeApp(firebaseConfig);

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
        <AuthenticationContextProvider>
          <FavoriteContextProvider>
            <LocationContextProvider>
              <RestaurantContextProvider>
                <Navigation />
              </RestaurantContextProvider>
            </LocationContextProvider>
          </FavoriteContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar hidden={false} />
    </>
  );
}
