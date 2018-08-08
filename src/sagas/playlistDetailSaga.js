import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as playlistDetailTypes } from '../reducers/playlistDetailReducer';
import { selectUserId } from '../reducers/userProfileReducer';
import { selectPlaylistDetailItems } from '../reducers/playlistDetailReducer';

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

export const deletePlaylistTrack = (track, playlistId) => {
  return {
    type: playlistDetailTypes.DELETE_PLAYLIST_TRACK,
    payload: {
      playlistId,
      track,
    },
  };
};

function* doGetPlaylistDetail(action) {
  const userId = yield select(selectUserId);
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

function* doDeletePlaylistTrack(action) {
  const userId = yield select(selectUserId);
  const { playlistId, track } = action.payload;
  const playlistItems = yield select(selectPlaylistDetailItems);
  const trackPosition = playlistItems.findIndex(item => item.track.id === track.id);
  const deletedTrack = [
    {
      uri: track.uri,
      positions: [trackPosition],
    },
  ];

  const resp = yield call(api.playlist.deleteTrack, playlistId, userId, deletedTrack);
  console.log(resp, 'resp');
  if (resp.ok === false) {
    return yield put({
      type: playlistDetailTypes.DELETE_PLAYLIST_TRACK_FAIL,
      payload: resp.error.message,
    });
  }

  yield put({
    type: playlistDetailTypes.DELETE_PLAYLIST_TRACK_SUCCESS,
    payload: resp.data,
  });
}

export default function* playlistDetailSaga() {
  yield takeLatest(playlistDetailTypes.GET_PLAYLIST_DETAIL, doGetPlaylistDetail);
  yield takeLatest(playlistDetailTypes.GET_PLAYLIST_COVER_IMAGE, doGetPlaylistImageCover);
  yield takeLatest(playlistDetailTypes.DELETE_PLAYLIST_TRACK, doDeletePlaylistTrack);
}
