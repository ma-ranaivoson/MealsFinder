const live = 'https://us-central1-meals-finder-adf3e.cloudfunctions.net';
const local = 'http://localhost:5001/meals-finder-adf3e/us-central1';

export const isDevelopement = process.env.NODE_ENV === 'development';
export const host = live;
export const isMock = false;
