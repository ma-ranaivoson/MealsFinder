import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantContext } from '../../../services/restaurants/restaurant.context';
import Search from '../components/Search';
import MapCallout from '../components/MapCallout';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export default function MapScreen() {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantContext);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southeastLat = viewport.southwest.lat;
    const latitudeDelta = northeastLat - southeastLat;

    setLatDelta(latitudeDelta);
  }, [viewport, location]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant: any) => (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout>
              <MapCallout restaurant={restaurant} />
            </Callout>
          </Marker>
        ))}
      </Map>
    </>
  );
}
