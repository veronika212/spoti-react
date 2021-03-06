import { combineReducers } from 'redux';

export const actionTypes = {
  GET_USER_PROFILE: 'GET_USER_PROFILE',
  GET_USER_PROFILE_SUCCESS: 'GET_USER_PROFILE_SUCCESS',
  GET_USER_PROFILE_FAIL: 'GET_USER_PROFILE_FAIL',
};

const defaultState = {
  country: '',
  email: '',
  id: '',
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE_FAIL:
      return action.payload;
    case actionTypes.GET_USER_PROFILE:
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE:
      return true;
    case actionTypes.GET_USER_PROFILE_FAIL:
    case actionTypes.GET_USER_PROFILE_SUCCESS:
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
export const selectUserId = state => selectUserProfile(state).id;
export const selectUserCountry = state => selectUserProfile(state).country;
