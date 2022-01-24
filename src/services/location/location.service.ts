interface Geometry {
  geometry: {
    location: {
      lng: number;
      lat: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
}

export interface LocationType {
  name: string;
  results: Geometry[];
}

const camelize = require('camelize');

export function locationRequest(searchTerm: string) {
  return fetch(
    `http://localhost:5001/meals-finder-adf3e/us-central1/geocode?city=${searchTerm}`,
  )
    .then((res) => res.json())
    .catch((err) => {
      const e = err as Error;
      throw new Error(`${e.message}`);
    });
}

export function locationTransform(res: LocationType) {
  const { geometry = {} } = camelize(res.results)[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
}
