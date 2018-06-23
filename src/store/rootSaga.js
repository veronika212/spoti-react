import { all } from 'redux-saga/effects';

import authSaga from '../sagas/authSaga';
import userProfileSaga from '../sagas/userProfileSaga';

export default function* rootSaga() {
  yield all([authSaga(), userProfileSaga()]);
}
