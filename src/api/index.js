import axios from 'axios';

/**
 * Create client
 */

let accessToken = window.localStorage.getItem('accessToken');
let refreshToken = window.localStorage.getItem('refreshToken');
if (!accessToken) {
  accessToken = '';
}

function forwardErrorResponse(err) {
  if (accessToken === '') {
    window.location.href = '/login';
    return;
  }

  if (err.response.status === 401 && refreshToken.length < 0) {
    console.log('refresh');
  }

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

  // Songs
  songs: {
    getSongs: () => client.get(`${baseUrl}/me/tracks`).catch(forwardErrorResponse),
    delete: id => client.delete(`${baseUrl}/me/tracks/${id}`).catch(forwardErrorResponse),
  },

  // Playlists
  playlist: {
    getPlaylist: (playlistId, userId) =>
      client
        .get(`${baseUrl}/users/${userId}/playlists/${playlistId}/tracks`)
        .catch(forwardErrorResponse),
  },
};
