import axios from 'axios';

/**
 * Create client
 */

let accessToken = window.localStorage.getItem('accessToken');
if (!accessToken) {
  accessToken = '';
}

function forwardErrorResponse(err) {
  const resp = {
    ...err.response.data,
    ok: false,
  };
  if (resp.error.message === 'Only valid bearer authentication supported') {
    window.location.href = '/login';
    return;
  }
  return resp;
}

const baseUrl = 'https://api.spotify.com/v1';
export const client = axios.create({
  responseType: 'json',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default {
  // Auth
  auth: {},

  // User
  user: {
    getProfile: () => client.get(`${baseUrl}/me`).catch(forwardErrorResponse),
  },
};
