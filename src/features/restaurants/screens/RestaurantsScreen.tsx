import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';
import SafeArea from '../../../components/utility/SafeArea';

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
});

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeArea>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <RestaurantList
        data={[{ name: 'test' }, { name: 'test 2' }, { name: 'test 3' }]}
        renderItem={() => <RestaurantInfoCard />}
        keyExtractor={(item: any) => item.name}
      />
    </SafeArea>
  );
}
