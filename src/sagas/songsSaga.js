import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as songsActionTypes } from '../reducers/songsReducer';

// Action creators
export const getSongs = () => {
  return {
    type: songsActionTypes.GET_SONGS,
  };
};

export const deleteSong = ids => {
  return {
    type: songsActionTypes.DELETE_SONG,
    payload: ids,
  };
};

// Sagas
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

function* doDeleteSong(action) {
  // console.log('doDeleteSong');
  try {
    yield call(api.songs.delete, action.payload);
    yield put({
      type: songsActionTypes.DELETE_SONG_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: songsActionTypes.DELETE_SONG_FAIL,
      payload: error,
    });
  }
}

export default function* songsSaga() {
  yield takeLatest(songsActionTypes.GET_SONGS, doGetSongs);
  yield takeLatest(songsActionTypes.DELETE_SONG, doDeleteSong);
}
