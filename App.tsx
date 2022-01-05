import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
// eslint-disable-next-line camelcase
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
// eslint-disable-next-line camelcase
import { Lato_400Regular } from '@expo-google-fonts/lato';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ParamListBase } from '@react-navigation/routers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProp } from '@react-navigation/core';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RestaurantsScreen from './src/features/restaurants/screens/RestaurantsScreen';
import SafeArea from './src/components/utility/SafeArea';
import { RestaurantContextProvider } from './src/services/restaurants/restaurant.context';
import { LocationContextProvider } from './src/services/location/location.context';

import theme from './src/infrastructure/theme/theme';

const Tab = createBottomTabNavigator();

// eslint-disable-next-line func-names
const Setting = function () {
  return (
    <SafeArea>
      <Text>Setting</Text>
    </SafeArea>
  );
};
// eslint-disable-next-line func-names
const Map = function () {
  return (
    <SafeArea>
      <Text>Map</Text>
    </SafeArea>
  );
};

const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    let iconName;

    if (route.name === 'Restaurants') {
      iconName = 'md-restaurant';
    } else if (route.name === 'Setting') {
      iconName = 'md-settings';
    } else if (route.name === 'Map') {
      iconName = 'md-map';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

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
            <NavigationContainer>
              <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Setting" component={Setting} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar hidden={false} />
    </>
  );
}
