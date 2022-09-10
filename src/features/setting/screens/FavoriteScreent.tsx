import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../../../services/favorites/favorites.context';
import { RestaurantList } from '../../restaurants/screens/RestaurantsScreen';
import RestaurantInfoCard from '../../restaurants/components/RestaurantsInfoCard';

export default function FavoriteScreen({ navigation } : { navigation: any }) {
  const { favorites } = React.useContext(FavoriteContext);

  return (
    <RestaurantList
      data={favorites}
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
  );
}
