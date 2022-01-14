import React, { useContext } from 'react';
import styled from 'styled-components/native';
// eslint-disable-next-line object-curly-newline
import { StyleSheet, View, Platform, StatusBar, FlatList } from 'react-native';
import Search from '../components/Search';
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export default function RestaurantsScreen() {
  const { isLoading, error, restaurants } = useContext(RestaurantContext);

  return (
    <SafeArea>
      <View style={styles.search}>
        <Search />
      </View>
      {isLoading ? (
        <Loader size="large" />
      ) : (
        <RestaurantList
          data={restaurants}
          // eslint-disable-next-line react/no-unused-prop-types
          renderItem={({ item }: { item: any }) => (
            <RestaurantInfoCard restaurant={item} />
          )}
          keyExtractor={(item: any) => item.name}
        />
      )}
    </SafeArea>
  );
}
