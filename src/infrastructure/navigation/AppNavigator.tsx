import React from 'react';
import { Ionicons } from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ParamListBase } from '@react-navigation/routers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProp } from '@react-navigation/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableRipple } from 'react-native-paper';
import { RestaurantContextProvider } from '../../services/restaurants/restaurant.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { FavoriteContextProvider } from '../../services/favorites/favorites.context';

import RestaurantsNavigator from './RestaurantsNavigator';
import MapScreen from '../../features/map/screens/MapScreen';
import SettingNavigator from './SettingNavigator';
import CheckoutScreen from '../../features/checkout/screen/CheckoutScreen';

const Tab = createBottomTabNavigator();

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
    } else if (route.name === 'Cart') {
      iconName = 'md-cart';
    }
    // @ts-ignore: Unreachable code error
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
  tabBarButton: (props: any) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TouchableRipple {...props} />
  ),
});

export default function AppNavigator() {
  return (
    <FavoriteContextProvider>
      <LocationContextProvider>
        <RestaurantContextProvider>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Cart" component={CheckoutScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Setting" component={SettingNavigator} />
          </Tab.Navigator>
        </RestaurantContextProvider>
      </LocationContextProvider>
    </FavoriteContextProvider>
  );
}
