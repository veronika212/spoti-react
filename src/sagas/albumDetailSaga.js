import { call, put, takeLatest } from 'redux-saga/effects';

import { actionTypes as actionAlbumDetail } from '../reducers/albumDetailReducer';
import api from '../api';

//Actions
export const getAlbumDetail = id => {
  return {
    type: actionAlbumDetail.GET_ALBUM_DETAIL,
    payload: id,
  };
};

//Sagas
function* doGetAlbumDetailSaga(action) {
  const albumId = action.payload;
  const resp = yield call(api.albumDetail.getAlbum, albumId);
  if (resp.ok === false) {
    return yield put({
      type: actionAlbumDetail.GET_ALBUM_DETAIL_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: actionAlbumDetail.GET_ALBUM_DETAIL_SUCCESS,
    payload: resp.data,
  });
}

export default function* albumDetailSaga() {
  yield takeLatest(actionAlbumDetail.GET_ALBUM_DETAIL, doGetAlbumDetailSaga);
}
