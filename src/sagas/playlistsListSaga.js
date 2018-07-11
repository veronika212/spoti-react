import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as playlistsListsActionTypes } from '../reducers/playlistsListReducer';

// Actions creators
export const getPlaylistsList = () => {
  return {
    type: playlistsListsActionTypes.GET_PLAYLISTS_LIST,
  };
};

// Sagas
function* doGetPlaylistsList(action) {
  try {
    const resp = yield call(api.playlistsList.getPlaylists);
    yield put({
      type: playlistsListsActionTypes.GET_PLAYLISTS_LIST_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: playlistsListsActionTypes.GET_PLAYLISTS_LIST_FAIL,
      payload: error,
    });
  }
}

export default function* playlistsListSaga() {
  yield takeLatest(playlistsListsActionTypes.GET_PLAYLISTS_LIST, doGetPlaylistsList);
}
