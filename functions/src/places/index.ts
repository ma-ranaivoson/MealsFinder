import { Client } from '@googlemaps/google-maps-services-js';
import * as functions from 'firebase-functions';
import { google } from '../env/env';
import { mocks, addMockImages } from './mock';

const url = require('url');

// const addGoogleImage = (restaurant: any) => {
//   const ref = restaurant.photos[0].photo_reference;

//   if (!ref) {
//     // eslint-disable-next-line no-param-reassign
//     restaurant.photos = [
//       'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
//     ];

//     return restaurant;
//   }

//   // eslint-disable-next-line no-param-reassign
//   restaurant.photo = [
//     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${google.apiKey}`,
//   ];

//   return restaurant;
// };

const placesRequest = async (
  request: functions.https.Request,
  response: functions.Response<any>,
  client: Client,
) => {
  const { query } = url.parse(request.url, true);
  const { location, mock } = query;

  if (mock === 'true') {
    const data = mocks[location];

    if (data) {
      data.results = data.results.map(addMockImages);
    }

    return response.json(data);
  }

  try {
    const res = await client.placesNearby({
      params: {
        location,
        radius: 1500,
        type: 'restaurant',
        key: google.apiKey,
      },
      timeout: 1000,
    });
    const { data } = res;
    data.results = data.results.map(addMockImages);

    return response.json(data);
  } catch (err) {
    const e = err as any;
    return response.status(400).send(e.response.data.error_message);
  }
};

export default placesRequest;
