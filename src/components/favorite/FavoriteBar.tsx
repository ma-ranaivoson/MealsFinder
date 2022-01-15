import React from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';
import CompactRestaurantInfo from '../restaurant/CompactRestaurantInfo';
import TextTypo from '../typography/Text';

const FavoriteWrapper = styled.View`
  padding: 10px;
`;

export default function FavoriteBar({
  favorites,
  onNavigate,
}: {
  favorites: Restaurant[];
  // eslint-disable-next-line no-unused-vars
  onNavigate: (a: string, b: object) => void;
}) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <FavoriteWrapper>
      <View style={{ paddingLeft: 10 }}>
        <TextTypo variant="caption">Favorites</TextTypo>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <View key={key} style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => onNavigate('RestaurantDetail', { restaurant })}
              >
                <CompactRestaurantInfo restaurant={restaurant} isMap={false} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </FavoriteWrapper>
  );
}
