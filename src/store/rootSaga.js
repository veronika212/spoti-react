import { all } from 'redux-saga/effects';

import authSaga from '../sagas/authSaga';
import userProfileSaga from '../sagas/userProfileSaga';
import songsSaga from '../sagas/songsSaga';

export default function* rootSaga() {
  yield all([authSaga(), userProfileSaga(), songsSaga()]);
}
