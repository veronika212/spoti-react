import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from '../api';
import {
  actionTypes as artistDetailActionTypes,
  // selectArtistDetail,
} from '../reducers/artistDetailReducer';
import { selectUserCountry } from '../reducers/userProfileReducer';

// Action creators
export const getArtistDetail = id => {
  return {
    type: artistDetailActionTypes.GET_ARTIST_DETAIL,
    payload: id,
  };
};

export const getArtistDetailImage = id => {
  return {
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_IMAGE,
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
function* doGetArtistDetailSaga(action) {
  const country = yield select(selectUserCountry);
  const artistId = action.payload;

  const resp = yield call(api.artistDetail.get, artistId, country);
  // console.log(resp);
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

function* doGetArtistDetailImageSaga(action) {
  const artistId = action.payload;
  const resp = yield call(api.artistDetail.getImage, artistId);
  // console.log(resp);
  if (resp.ok === false) {
    return yield put({
      type: artistDetailActionTypes.GET_ARTIST_DETAIL_IMAGE_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: artistDetailActionTypes.GET_ARTIST_DETAIL_IMAGE_SUCCESS,
    payload: resp.data,
  });
}

function* doGetArtistDetailAlbumsSaga(action) {
  const artistId = action.payload;
  const resp = yield call(api.artistDetail.getAlbums, artistId);
  console.log(resp);
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
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL, doGetArtistDetailSaga);
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL_IMAGE, doGetArtistDetailImageSaga);
  yield takeLatest(artistDetailActionTypes.GET_ARTIST_DETAIL_ALBUMS, doGetArtistDetailAlbumsSaga);
}
