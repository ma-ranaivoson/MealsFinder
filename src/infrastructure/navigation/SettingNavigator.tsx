import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SettingScreen from '../../features/setting/screens/SettingScreen';
import FavoriteScreen from '../../features/setting/screens/FavoriteScreent';
import CameraScreen from '../../features/setting/screens/CameraScreen';

const SettingStack = createStackNavigator();

export default function SettingNavigator() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: true,
      }}
    >
      <SettingStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingScreen}
      />
      <SettingStack.Screen name="Favorites" component={FavoriteScreen} />
      <SettingStack.Screen name="Camera" component={CameraScreen} />
    </SettingStack.Navigator>
  );
}
