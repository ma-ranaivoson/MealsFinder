import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { Restaurant } from '../../features/restaurants/components/RestaurantsInfoCard';
import TextTypo from '../typography/Text';

interface Props {
  restaurant: Restaurant;
  isMap: boolean;
}

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === 'android';

export default function CompactRestaurantInfo({ restaurant, isMap }: Props) {
  return (
    <Item>
      {isAndroid && isMap ? (
        <CompactWebView source={{ uri: restaurant.photos[0] }} />
      ) : (
        <CompactImage source={{ uri: restaurant.photos[0] }} />
      )}
      <TextTypo variant="caption" numberOfLines={3}>
        {restaurant.name}
      </TextTypo>
    </Item>
  );
}
