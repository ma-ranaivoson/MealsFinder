import { locations } from './location.mock';

interface Geometry {
  geometry: {
    location: {
      lng: number,
      lat: number,
    },
    viewport: {
      northeast: {
        lat: number,
        lng: number
      },
      southwest: {
        lat: number,
        lng: number,
      },
    }
  }
}

export interface LocationType {
  name: string,
  results: Geometry[]
}

const camelize = require('camelize');

export function locationRequest(searchTerm: string) {
  return new Promise((resolve, reject) => {
    const locationMock = locations.filter((loc) => loc.name === searchTerm);

    if (locationMock.length === 0) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Not found');
    } else {
      resolve(locationMock[0]);
    }
  });
}

export function locationTransform(res: LocationType) {
  const { geometry = {} } = camelize(res.results)[0];
  const { lat, lng } = geometry.location;
  return { lat, lng };
}
