import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
  },
  search: {
    padding: 16,
    justifyContent: 'center',
  },
  list: {
    padding: 16,
    flex: 1,
  },
});

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.list}>
        <RestaurantInfoCard />
      </View>
    </SafeAreaView>
  );
}
