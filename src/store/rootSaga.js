import { all } from 'redux-saga/effects';

import userProfileSaga from '../sagas/userProfileSaga';
import songsSaga from '../sagas/songsSaga';
import playlistDetailSaga from '../sagas/playlistDetailSaga';
import userPlaylistsSaga from '../sagas/userPlaylistsSaga';
import artistsSaga from '../sagas/artistsSaga';
import artistDetailSaga from '../sagas/artistDetailSaga';
import albumDetailSaga from '../sagas/albumDetailSaga';
import searchSaga from '../sagas/searchSaga';
import createPlaylistSaga from '../sagas/playlistFormSaga';

export default function* rootSaga() {
  yield all([
    userProfileSaga(),
    songsSaga(),
    playlistDetailSaga(),
    userPlaylistsSaga(),
    artistsSaga(),
    artistDetailSaga(),
    albumDetailSaga(),
    searchSaga(),
    createPlaylistSaga(),
  ]);
}
