import { Client } from '@googlemaps/google-maps-services-js';
import * as functions from 'firebase-functions';
import { mocks, addMockImages } from './mock';

const url = require('url');

const placesRequest = (
  request: functions.https.Request,
  response: functions.Response<any>,
  client: Client,
) => {
  const { query } = url.parse(request.url, true);
  const { location } = query;
  const data = mocks[location];

  if (data) {
    data.results = data.results.map(addMockImages);
  }

  return response.json(data);
};

export default placesRequest;
