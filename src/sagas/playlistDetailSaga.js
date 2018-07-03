import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as playlistDetailTypes } from '../reducers/playlistDetailReducer';

export const getPlaylistDetail = id => {
  return {
    type: playlistDetailTypes.GET_PLAYLIST_DETAIL,
    payload: id,
  };
};

function* doGetPlaylistDetail(action) {
  try {
    // example playlist id 0cto0rV7OuKvWtqvR3MKnX
    const userId = 'matty18031990'; // TODO remove hardcoded data and select userId from store
    const playlistId = action.payload;
    const resp = yield call(api.playlist.getPlaylist, playlistId, userId);
    console.log(resp);
    yield put({
      type: playlistDetailTypes.GET_PLAYLIST_DETAIL_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: playlistDetailTypes.GET_PLAYLIST_DETAIL_FAIL,
      payload: error,
    });
  }
}

export default function* songsSaga() {
  yield takeLatest(playlistDetailTypes.GET_PLAYLIST_DETAIL, doGetPlaylistDetail);
}
