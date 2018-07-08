import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as playlistDetailTypes } from '../reducers/playlistDetailReducer';
import { selectUserId } from '../reducers/userProfileReducer';

export const getPlaylistDetail = id => {
  return {
    type: playlistDetailTypes.GET_PLAYLIST_DETAIL,
    payload: id,
  };
};

export const getPlaylistCoverImage = id => {
  return {
    type: playlistDetailTypes.GET_PLAYLIST_COVER_IMAGE,
    payload: id,
  };
};

function* doGetPlaylistDetail(action) {
  // example playlist id 0cto0rV7OuKvWtqvR3MKnX
  const userId = 'dw'; // TODO remove hardcoded data and select userId from store
  const playlistId = action.payload;
  const resp = yield call(api.playlist.get, playlistId, userId);

  if (resp.ok === false) {
    return yield put({
      type: playlistDetailTypes.GET_PLAYLIST_DETAIL_FAIL,
      payload: resp.error.message,
    });
  }

  yield put({
    type: playlistDetailTypes.GET_PLAYLIST_DETAIL_SUCCESS,
    payload: resp.data,
  });
}

function* doGetPlaylistImageCover(action) {
  const userId = yield select(selectUserId);
  const resp = yield call(api.playlist.getImage, action.payload, userId);
  if (resp.ok === false) {
    return yield put({
      type: playlistDetailTypes.GET_PLAYLIST_COVER_IMAGE_FAIL,
      payload: resp.error.message,
    });
  }

  yield put({
    type: playlistDetailTypes.GET_PLAYLIST_COVER_IMAGE_SUCCESS,
    payload: resp.data,
  });
}

export default function* playlistDetailSaga() {
  yield takeLatest(playlistDetailTypes.GET_PLAYLIST_DETAIL, doGetPlaylistDetail);
  yield takeLatest(playlistDetailTypes.GET_PLAYLIST_COVER_IMAGE, doGetPlaylistImageCover);
}
