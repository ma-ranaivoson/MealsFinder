import React from 'react';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

interface Restaurant {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarly: boolean;
}

interface Props {
  restaurant?: Restaurant;
}

const RestaurantCard = styled(Card)`
  background-color: white;
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: 20px;
  background-color: white;
`;

const Title = styled.Text`
  padding: 16px;
  color: ${(props) => props.theme.Color.text.error};
`;

export default function RestaurantInfoCard({
  restaurant = {} as Restaurant,
}: Props) {
  const {
    name = 'Some Restaurant',
    icon,
    photos = [
      'https://media.gettyimages.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?s=612x612',
    ],
    address,
    isClosedTemporarly,
    isOpenNow = true,
    rating = 4,
  } = restaurant;

  return (
    <RestaurantCard elevation={6}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Title>{name}</Title>
    </RestaurantCard>
  );
}

RestaurantInfoCard.defaultProps = {
  restaurant: {},
};
