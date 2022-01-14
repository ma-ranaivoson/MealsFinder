import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import RestaurantsScreen from '../../features/restaurants/screens/RestaurantsScreen';
import RestaurantDetailScreen from '../../features/restaurants/screens/RestaurantDetailScreen';

const RestaurantStack = createStackNavigator();

export default function RestaurantsNavigator() {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    >
      <RestaurantStack.Screen
        name="Restaurant"
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
}
