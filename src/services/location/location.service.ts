import { locations } from './location.mock';

const camelize = require('camelize');

export function locationRequest(searchTerm: string | number) {
  return new Promise((resolve, reject) => {
    // @ts-ignore: Unreachable code error
    const locationMock = locations[searchTerm];

    if (!locationMock) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Not found');
    } else {
      resolve(locationMock);
    }
  });
}

export function locationTransform(result: { results: any[] }) {
  const { geometry = {} } = camelize(result.results)[0];
  const { lat, lng } = geometry.location;

  return { lat, lng };
}
