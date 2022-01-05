import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
// eslint-disable-next-line object-curly-newline
import { StyleSheet, View, Platform, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Loader from '../../../components/loader/Loader';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';
import SafeArea from '../../../components/utility/SafeArea';
import { RestaurantContext } from '../../../services/restaurants/restaurant.context';

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
  const { isLoading, error, restaurants } = useContext(RestaurantContext);

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
      {isLoading ? (
        <Loader size="large" />
      ) : (
        <RestaurantList
          data={restaurants}
          // eslint-disable-next-line react/no-unused-prop-types
          renderItem={({ item }: { item: any }) => {
            console.log(item);
            return <RestaurantInfoCard restaurant={item} />;
          }}
          keyExtractor={(item: any) => item.name}
        />
      )}
    </SafeArea>
  );
}
