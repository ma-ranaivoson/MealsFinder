import * as functions from 'firebase-functions';
import { locations as locationsMock } from './location.mock';

const url = require('url');

// eslint-disable-next-line import/prefer-default-export
export const geocodeRequest = functions.https.onRequest((request, response) => {
  const { query } = url.parse(request.url, true);
  const { city } = query;
  const res = locationsMock.find((loc) => loc.name === city.toLowerCase());
  response.json(res?.results);
});
