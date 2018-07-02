import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as songsActionTypes } from '../reducers/songsReducer';

export const getSongs = () => {
  return {
    type: songsActionTypes.GET_SONGS,
  };
};

function* doGetSongs(action) {
  try {
    const resp = yield call(api.songs.getSongs);
    yield put({
      type: songsActionTypes.GET_SONGS_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: songsActionTypes.GET_SONGS_FAIL,
      payload: error,
    });
  }
}

export default function* songsSaga() {
  yield takeLatest(songsActionTypes.GET_SONGS, doGetSongs);
}
