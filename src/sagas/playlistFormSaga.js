import { call, put, takeLatest, select } from 'redux-saga/effects';
import api from '../api';

import { actionTypes as createPlaylistActionTypes } from '../reducers/userPlaylistsReducer';
import { selectUserId } from '../reducers/userProfileReducer';

//Action creators
export const createPlaylist = (name, description) => {
  return {
    type: createPlaylistActionTypes.CREATE_PLAYLIST,
    payload: {
      name,
      description,
    },
  };
};

// Sagas

function* doCreatePlaylist(action) {
  const { name, description } = action.payload;
  const userId = yield select(selectUserId);
  const resp = yield call(api.playlist.create, userId, { name, description });
  if (resp.ok === false) {
    return yield put({
      type: createPlaylistActionTypes.CREATE_PLAYLIST_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: createPlaylistActionTypes.CREATE_PLAYLIST_SUCCESS,
    payload: resp.data,
  });
}

export default function* createPlaylistSaga() {
  yield takeLatest(createPlaylistActionTypes.CREATE_PLAYLIST, doCreatePlaylist);
}
