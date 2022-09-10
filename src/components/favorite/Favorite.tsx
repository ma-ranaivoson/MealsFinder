import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { FavoriteContext } from '../../services/favorites/favorites.context';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export default function Favorite({ restaurant }: { restaurant: Restaurant }) {
  // eslint-disable-next-line operator-linebreak
  const { addToFavorites, favorites, removeFromFavorites } =
    React.useContext(FavoriteContext);

  const isFavorite = favorites.find((r) => r.placeId === restaurant.placeId);

  return (
    <FavoriteButton
      onPress={() => (!isFavorite
        ? addToFavorites(restaurant)
        : removeFromFavorites(restaurant))}
    >
      <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={24} color="tomato" />
    </FavoriteButton>
  );
}
