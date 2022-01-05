import React from 'react';
import { Image } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import TextTypo from '../../../components/typography/Text';

export interface Restaurant {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
}

interface Props {
  restaurant?: Restaurant;
}

const RestaurantCard = styled(Card)`
  background-color: white;
  margin-bottom: 16px;
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${({ theme }) => theme.Spacing.space[3]};
  background-color: white;
`;

const Info = styled.View`
  padding: ${({ theme }) => theme.Spacing.space[3]};
`;

const Address = styled.Text`
  font-family: ${({ theme }) => theme.Font.fonts.body};
  font-size: ${({ theme }) => theme.Font.fontSizes.caption};
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: ${({ theme }) => theme.Spacing.space[2]};
  padding-bottom: ${({ theme }) => theme.Spacing.space[2]};
  justify-content: space-between;
`;

const Rate = styled.View`
  flex-direction: row;
`;
const Open = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default function RestaurantInfoCard({
  restaurant = {} as Restaurant,
}: Props) {
  const {
    name = 'Some Restaurant',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos = [
      'https://media.gettyimages.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?s=612x612',
    ],
    address = '100 Some random street',
    isClosedTemporarily = true,
    isOpenNow = false,
    rating = 5,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={6}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <TextTypo variant="label">{name}</TextTypo>
        <Rating>
          <Rate>
            {ratingArray.map((elem) => (
              <SvgXml key={elem} xml={star} width={20} height={20} />
            ))}
          </Rate>
          <Open>
            {isClosedTemporarily && (
              <TextTypo variant="error" style={{ paddingRight: 16 }}>
                CLOSED TEMPORARILY
              </TextTypo>
            )}
            {isOpenNow && (
              <SvgXml
                xml={open}
                width={20}
                height={20}
                style={{ paddingLeft: 16 }}
              />
            )}
            {isClosedTemporarily && (
              <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
            )}
          </Open>
        </Rating>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}

RestaurantInfoCard.defaultProps = {
  restaurant: {},
};
