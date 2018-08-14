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
  try {
    const resp = yield call(api.userPlaylists.getUserPlaylists);
    yield put({
      type: userPlaylistsActionTypes.GET_USER_PLAYLISTS_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: userPlaylistsActionTypes.GET_USER_PLAYLISTS_FAIL,
      payload: error,
    });
  }
}

export default function* playlistsListSaga() {
  yield takeLatest(userPlaylistsActionTypes.GET_USER_PLAYLISTS, doGetUserPlaylists);
}
