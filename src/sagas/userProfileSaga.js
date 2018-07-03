import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes as authActionTypes } from '../reducers/authReducer';
import { actionTypes as userProfileActionTypes } from '../reducers/userProfileReducer';

import api from '../api';

function* doGetUserProfile(action) {
  try {
    const resp = yield call(api.user.getProfile);
    yield put({
      type: userProfileActionTypes.GET_USER_PROFILE_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: userProfileActionTypes.GET_USER_PROFILE_FAIL,
      paylodad: error,
    });
  }
}

export default function* userProfileSaga() {
  yield takeLatest(authActionTypes.LOGIN_SUCCESS, doGetUserProfile);
}
