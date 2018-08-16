import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes as userProfileActionTypes } from '../reducers/userProfileReducer';
import { history } from '../index';

import api from '../api';

export const getUserProfile = () => {
  return {
    type: userProfileActionTypes.GET_USER_PROFILE,
  };
};

function* doGetUserProfile(action) {
  try {
    const resp = yield call(api.user.getProfile);
    yield put({
      type: userProfileActionTypes.GET_USER_PROFILE_SUCCESS,
      payload: resp.data,
    });
    history.push('/');
  } catch (error) {
    yield put({
      type: userProfileActionTypes.GET_USER_PROFILE_FAIL,
      paylodad: error,
    });
  }
}

export default function* userProfileSaga() {
  yield takeLatest(userProfileActionTypes.GET_USER_PROFILE, doGetUserProfile);
}
