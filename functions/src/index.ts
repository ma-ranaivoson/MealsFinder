import * as functions from 'firebase-functions';
import { geocodeRequest } from './geocode';

// eslint-disable-next-line import/prefer-default-export
export const geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});
