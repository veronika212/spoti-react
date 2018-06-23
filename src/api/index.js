import axios from 'axios';

/**
 * Create client
 */

export const client = axios.create({
  baseUrl: '/api',
  responseType: 'json',
});

export default {
  // Auth
  auth: {},
};
