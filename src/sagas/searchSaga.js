import { call, put, takeLatest } from 'redux-saga/effects';
import { history } from '../index';
import api from '../api';

import { actionTypes as searchActionTypes } from '../reducers/searchReducer';

//Action creators
export const search = (query, types = ['album', 'artist', 'track', 'playlist']) => {
  return {
    type: searchActionTypes.GET_SEARCH,
    payload: {
      query,
      types,
    },
  };
};

// Sagas
function* doGetSearch(action) {
  const { query, types } = action.payload;
  const searcedTypes = types.join(',');
  const searchQuery = `${query}&type=${searcedTypes}`;

  const resp = yield call(api.search.get, searchQuery);
  if (resp.ok === false) {
    return yield put({
      type: searchActionTypes.GET_SEARCH_FAIL,
      payload: resp.error.message,
    });
  }
  yield put({
    type: searchActionTypes.GET_SEARCH_SUCCESS,
    payload: resp.data,
  });

  history.push('/result');
}

export default function* playlistsListSaga() {
  yield takeLatest(searchActionTypes.GET_SEARCH, doGetSearch);
}
