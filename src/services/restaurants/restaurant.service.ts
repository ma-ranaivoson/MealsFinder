import { mockImages } from './mock';
import { host, isMock } from '../../utils/env';

const camelize = require('camelize');

export function restaurantRequest(location: string) {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`)
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
    // eslint-disable-next-line no-param-reassign
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
