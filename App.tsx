import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  return (
    <View style={{paddingTop: 20}}>
      <StatusBar hidden={false} />
      <Text>Hello world {StatusBar.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});
