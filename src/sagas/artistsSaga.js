import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as artistsActionTypes } from '../reducers/artistsReducer';
import { selectSongs } from '../reducers/songsReducer';

// Action creators
export const getArtists = () => {
  return {
    type: artistsActionTypes.GET_ARTISTS,
  };
};

// Sagas
function* doGetArtistsSaga(action) {
  const songs = yield select(selectSongs);
  const artists = songs.map(song => song.track.artists[0].id);
  const filteredArtist = artists.filter((value, index, self) => self.indexOf(value) === index);

  const stringifyArtistsIds = filteredArtist.join(',');
  const resp = yield call(api.artists.get, stringifyArtistsIds);

  if (resp.ok === false) {
    return yield put({
      type: artistsActionTypes.GET_ARTISTS_FAIL,
      payload: resp.error.message,
    });
  }

  yield put({
    type: artistsActionTypes.GET_ARTISTS_SUCCESS,
    payload: resp.data,
  });
}

export default function* playlistDetailSaga() {
  yield takeLatest(artistsActionTypes.GET_ARTISTS, doGetArtistsSaga);
}
