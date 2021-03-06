import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as userPlaylistsActionTypes } from '../reducers/userPlaylistsReducer';
// Actions creators
export const getUserPlaylists = () => {
  return {
    type: userPlaylistsActionTypes.GET_USER_PLAYLISTS,
  };
};

// Sagas
function* doGetUserPlaylists(action) {
  const resp = yield call(api.userPlaylists.getUserPlaylists);
  if (resp.ok === false) {
    return yield put({
      type: userPlaylistsActionTypes.GET_USER_PLAYLISTS_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: userPlaylistsActionTypes.GET_USER_PLAYLISTS_SUCCESS,
    payload: resp.data,
  });
}

export default function* userPlaylistSaga() {
  yield takeLatest('GET_USER_PLAYLISTS', doGetUserPlaylists);
}
