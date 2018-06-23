import { combineReducers } from 'redux';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};

function result(state = null, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.payload;
    case actionTypes.LOGOUT:
      return null;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL:
      return action.payload;
    case action.LOGIN:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return true;
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  result,
  error,
  working,
});

/**
 * Selectors
 */
export const selectAccessToken = state => state.auth.result.accessToken;
