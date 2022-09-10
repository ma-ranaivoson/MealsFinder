/* eslint-disable react/require-default-props */
import React from 'react';
import { Animated } from 'react-native';

export default function FadeInView({ children, duration = 1500, style }: {
  children: React.ReactNode,
  duration?: number,
  style?: object,
}) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
