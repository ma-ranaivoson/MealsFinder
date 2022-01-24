import * as functions from 'firebase-functions';
import geocodeRequest from './geocode';
import placesRequest from './places';

export const geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
});
