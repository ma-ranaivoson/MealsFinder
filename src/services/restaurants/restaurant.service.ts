// eslint-disable-next-line import/no-relative-packages
import { mockImages } from '../../../functions/lib/places/mock';

const camelize = require('camelize');

export function restaurantRequest(location: string) {
  return fetch(
    `https://us-central1-meals-finder-adf3e.cloudfunctions.net/placesNearby?location=${location}`,
  )
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
