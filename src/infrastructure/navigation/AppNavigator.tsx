import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ParamListBase } from '@react-navigation/routers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProp } from '@react-navigation/core';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SafeArea from '../../components/utility/SafeArea';
import RestaurantsNavigator from './RestaurantsNavigator';
import MapScreen from '../../features/map/screens/MapScreen';

const Tab = createBottomTabNavigator();

// eslint-disable-next-line func-names
const Setting = function () {
  return (
    <SafeArea>
      <Text>Setting</Text>
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
    // @ts-ignore: Unreachable code error
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
  tabBarButton: (props: any) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TouchableHighlight {...props} underlayColor="tomato" />
  ),
});

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
