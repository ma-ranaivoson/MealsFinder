import { mocks, mockImages } from './mock';

const camelize = require('camelize');

export function restaurantRequest(location: string) {
  return new Promise((resolve, reject) => {
    // @ts-ignore: Unreachable code error
    const mock = mocks[location];

    // eslint-disable-next-line prefer-promise-reject-errors
    if (!mock) reject('not found');
    if (mock) {
      resolve(mock);
    }
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
