/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-relative-packages
import { mockImages } from '../../../functions/lib/places/mock';
import { host } from '../../utils/env';

const camelize = require('camelize');

export function restaurantRequest(location: string) {
  return fetch(`${host}/placesNearby?location=${location}`)
    .then((res) => res.json())
    .catch((err) => {
      const e = err as Error;
      throw new Error(`${e.message}`);
    });
}

export function restaurantTransform({
  results,
}: any): string | PromiseLike<string> {
  const mappedResults = results.map((restaurant: unknown | any) => {
    restaurant.photos = restaurant.photos.map(
      () => mockImages[Math.ceil(Math.random() * (mockImages.length - 1))],
    );

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
}
