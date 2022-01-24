import * as functions from 'firebase-functions';
import locations from './location.mock';

const url = require('url');

const geocodeRequest = functions.https.onRequest((request, response) => {
  const { query } = url.parse(request.url, true);
  const { city } = query;
  const res = locations[city];
  response.json(res?.results);
});

export default geocodeRequest;
