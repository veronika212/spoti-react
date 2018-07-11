import { combineReducers } from 'redux';

export const actionTypes = {
  GET_ARTISTS: 'GET_ARTISTS',
  GET_ARTISTS_SUCCESS: 'GET_ARTISTS_SUCCESS',
  GET_ARTISTS_FAIL: 'GET_ARTISTS_FAIL',
};

const defaultState = {
  artists: [],
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_ARTISTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_ARTISTS_FAIL:
      return action.payload;
    case actionTypes.GET_ARTISTS:
    case actionTypes.GET_ARTISTS_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ARTISTS:
      return true;
    case actionTypes.GET_ARTISTS_FAIL:
    case actionTypes.GET_ARTISTS_SUCCESS:
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

// Selectors
export const selectArtists = state => state.artists.result.artists;
