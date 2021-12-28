import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import RestaurantsScreen from './src/features/restaurants/screens/RestaurantsScreen';

export default function App() {
  return (
    <>
      <RestaurantsScreen />
      <ExpoStatusBar hidden={false} />
    </>
  );
}
