import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as artistDetailActionTypes } from '../reducers/artistDetailReducer';
import { selectUserCountry } from '../reducers/userProfileReducer';

// Action creators
export const getArtistDetailTracks = id => {
  return {
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_TRACKS,
    payload: id,
  };
};

export const getArtistDetail = id => {
  return {
    type: artistDetailActionTypes.GET_ARTIST_DETAIL,
    payload: id,
  };
};

export const getArtistDetailAlbums = id => {
  return {
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_ALBUMS,
    payload: id,
  };
};

// Sagas
function* doGetArtistDetailTracksSaga(action) {
  const country = yield select(selectUserCountry);
  const artistId = action.payload;

  const resp = yield call(api.artistDetail.getTracks, artistId, country);
  if (resp.ok === false) {
    return yield put({
      type: artistDetailActionTypes.GET_ARTIST_DETAIL_TRACKS_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_TRACKS_SUCCESS,
    payload: resp.data,
  });
}

function* doGetArtistDetailSaga(action) {
  const artistId = action.payload;
  const resp = yield call(api.artistDetail.getArtist, artistId);
  if (resp.ok === false) {
    return yield put({
      type: artistDetailActionTypes.GET_ARTIST_DETAIL_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_SUCCESS,
    payload: resp.data,
  });
}

function* doGetArtistDetailAlbumsSaga(action) {
  const artistId = action.payload;
  const resp = yield call(api.artistDetail.getAlbums, artistId);
  if (resp.ok === false) {
    return yield put({
      type: artistDetailActionTypes.GET_ARTIST_DETAIL_ALBUMS_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_ALBUMS_SUCCESS,
    payload: resp.data,
  });
}

export default function* artistDetailSaga() {
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL_TRACKS, doGetArtistDetailTracksSaga);
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL, doGetArtistDetailSaga);
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL_ALBUMS, doGetArtistDetailAlbumsSaga);
}
