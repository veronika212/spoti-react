import { combineReducers } from 'redux';

export const actionTypes = {
  GET_PROFILE: 'GET_PROFILE',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAIL: 'GET_PROFILE_FAIL',
};

function result(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_FAIL:
      return action.payload;
    case action.LOGIN:
    case actionTypes.GET_PROFILE:
    case actionTypes.GET_PROFILE_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return true;
    case actionTypes.GET_PROFILE_FAIL:
    case actionTypes.GET_PROFILE_SUCCESS:
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
export const selectUserProfile = state => state.userProfile.result;
