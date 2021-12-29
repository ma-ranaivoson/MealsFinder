import React from 'react';
import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
  },
  cover: {
    padding: 20,
    backgroundColor: 'white',
  },
});

const Title = styled.Text`
  padding: 16px;
  color: red;
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
    <Card elevation={6} style={styles.card}>
      <Card.Cover style={styles.cover} key={name} source={{ uri: photos[0] }} />
      <Title>{name}</Title>
    </Card>
  );
}

RestaurantInfoCard.defaultProps = {
  restaurant: {},
};
