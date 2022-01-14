import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantsScreen from '../../features/restaurants/screens/RestaurantsScreen';

const RestaurantStack = createNativeStackNavigator();

export default function RestaurantsNavigator() {
  return (
    <RestaurantStack.Navigator>
      <RestaurantStack.Screen
        name="Restaurant"
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
}
