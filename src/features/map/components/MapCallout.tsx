import React from 'react';
import { Restaurant } from '../../restaurants/components/RestaurantsInfoCard';
import CompactRestaurantInfo from '../../../components/restaurant/CompactRestaurantInfo';

interface Props {
  restaurant: Restaurant;
}

export default function MapCallout({ restaurant }: Props) {
  return <CompactRestaurantInfo restaurant={restaurant} isMap />;
}
