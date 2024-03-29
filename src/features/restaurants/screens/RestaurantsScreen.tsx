import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FadeInView from '../../../components/animations/FadeAnimation';
import Search from '../components/Search';
import Loader from '../../../components/loader/Loader';
import RestaurantInfoCard from '../components/RestaurantsInfoCard';
import SafeArea from '../../../components/utility/SafeArea';
import { TextError } from '../../account/components/AccountStyles';
import { RestaurantContext } from '../../../services/restaurants/restaurant.context';
import { FavoriteContext } from '../../../services/favorites/favorites.context';
import { LocationContext } from '../../../services/location/location.context';
import FavoriteBar from '../../../components/favorite/FavoriteBar';

interface Props {
  navigation: any;
}

const CenteredError = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 50px;
`;

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

export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  background-color: white;
`;

export default function RestaurantsScreen({ navigation }: Props) {
  const {
    isLoading,
    restaurants,
    error: restaurantError,
  } = useContext(RestaurantContext);
  const { error: locationError } = useContext(LocationContext);
  const { favorites } = useContext(FavoriteContext);
  const [isToggled, setIsToggled] = React.useState(false);

  const contentShow = isLoading ? (
    <Loader size="large" />
  ) : (
    <RestaurantList
      data={restaurants}
      // eslint-disable-next-line react/no-unused-prop-types
      renderItem={({ item }: { item: any }) => (
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
          >
            <RestaurantInfoCard restaurant={item} />
          </TouchableOpacity>
        </FadeInView>
      )}
      keyExtractor={(item: any) => item.name}
    />
  );

  return (
    <SafeArea>
      <View style={styles.search}>
        <Search
          isFavoritesToggled={isToggled}
          onFavoritesToggle={() => setIsToggled(!isToggled)}
        />
      </View>
      {isToggled && (
        <FavoriteBar onNavigate={navigation.navigate} favorites={favorites} />
      )}
      {locationError && restaurantError ? (
        <CenteredError>
          <TextError style={{ fontSize: 25 }}>No Restaurant Found</TextError>
        </CenteredError>
      ) : (
        contentShow
      )}
    </SafeArea>
  );
}
