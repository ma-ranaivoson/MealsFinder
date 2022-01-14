import React, { useContext } from 'react';
import styled from 'styled-components/native';
// eslint-disable-next-line object-curly-newline
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Search from '../components/Search';
import Loader from '../../../components/loader/Loader';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';
import SafeArea from '../../../components/utility/SafeArea';
import { RestaurantContext } from '../../../services/restaurants/restaurant.context';

interface Props {
  navigation: any;
}

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

export default function RestaurantsScreen({ navigation }: Props) {
  const { isLoading, restaurants } = useContext(RestaurantContext);

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
            <TouchableOpacity
              onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
            >
              <RestaurantInfoCard restaurant={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item: any) => item.name}
        />
      )}
    </SafeArea>
  );
}
