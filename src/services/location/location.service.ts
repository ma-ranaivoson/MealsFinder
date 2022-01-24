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

export function locationTransform(res: LocationType) {
  const { geometry = {} } = camelize(res)[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
}
