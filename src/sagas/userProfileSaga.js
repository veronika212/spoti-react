import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { actionTypes as userProfileActionTypes } from '../reducers/userProfileReducer';
import { store } from '../store/store';

export const getUserProfile = () => {
  return {
    type: userProfileActionTypes.GET_PROFILE,
  };
};

function* doGetUserProfile(action) {
  const resp = yield call(api.user.getProfile);

  console.log(resp, 'resp');
}

export default function* userProfileSaga() {
  yield takeLatest(userProfileActionTypes.GET_PROFILE, doGetUserProfile);
}
