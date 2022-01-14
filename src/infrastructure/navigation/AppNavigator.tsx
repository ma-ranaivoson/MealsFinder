import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ParamListBase } from '@react-navigation/routers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProp } from '@react-navigation/core';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SafeArea from '../../components/utility/SafeArea';
import RestaurantsNavigator from './RestaurantsNavigator';

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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
