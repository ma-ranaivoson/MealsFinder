import { Client } from '@googlemaps/google-maps-services-js';
import * as functions from 'firebase-functions';
import { google } from '../env/env';
import locations from './location.mock';

const url = require('url');

const geocodeRequest = async (
  request: functions.https.Request,
  response: functions.Response<any>,
  client: Client,
) => {
  const { query } = url.parse(request.url, true);
  const { city, mock } = query;

  if (mock === 'true') {
    const locationMock = locations[city.toLowerCase()];
    return response.json(locationMock?.results);
  }

  try {
    const res = await client.geocode({
      params: {
        address: city,
        key: google.apiKey,
      },
      timeout: 2000,
    });
    const { data } = res;

    return response.json(data);
  } catch (err) {
    const e = err as any;
    return response.status(400).send(e.response.data.error_message);
  }
};

export default geocodeRequest;
