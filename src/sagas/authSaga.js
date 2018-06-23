import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes as authActionTypes } from '../reducers/authReducer';

export const loginSuccess = payload => {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload,
  };
};

function* doLogin() {
  const resp = yield call(axios.get, 'http://localhost:8888', {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
  console.log(resp, 'resp');
}

export default function* authSaga() {
  yield takeLatest(authActionTypes.LOGIN, doLogin);
}
