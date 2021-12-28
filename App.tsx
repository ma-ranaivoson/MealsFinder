import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
  },
  search: {
    padding: 16,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: 'blue',
    padding: 16,
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text>Search </Text>
      </View>
      <View style={styles.list}>
        <Text>Changed</Text>
      </View>
      <ExpoStatusBar hidden={false} />
    </SafeAreaView>
  );
}
