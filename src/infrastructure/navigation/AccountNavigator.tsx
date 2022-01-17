import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Main"
        // eslint-disable-next-line react/no-unstable-nested-components
        component={() => (
          <View>
            <Text>Account screen</Text>
          </View>
        )}
      />
    </Stack.Navigator>
  );
}
