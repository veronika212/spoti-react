import { all } from 'redux-saga/effects';

import authSaga from '../sagas/authSaga';
import userProfileSaga from '../sagas/userProfileSaga';
import songsSaga from '../sagas/songsSaga';
import playlistDetailSaga from '../sagas/playlistDetailSaga';
import playlistsListSaga from '../sagas/playlistsListSaga';
import artistsSaga from '../sagas/artistsSaga';
import artistDetailSaga from '../sagas/artistDetailSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userProfileSaga(),
    songsSaga(),
    playlistDetailSaga(),
    playlistsListSaga(),
    artistsSaga(),
    artistDetailSaga(),
  ]);
}
