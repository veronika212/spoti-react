import { combineReducers } from 'redux';

export const actionTypes = {
  GET_SEARCH: 'GET_SEARCH',
  GET_SEARCH_SUCCESS: 'GET_SEARCH_SUCCESS',
  GET_SEARCH_FAIL: 'GET_SEARCH_FAIL',
};

const defaultState = {
  albums: { items: [] },
  artists: { items: [] },
  playlists: { items: [] },
  tracks: { items: [] },
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_FAIL:
      return action.payload;
    case actionTypes.GET_SEARCH_LIST:
    case actionTypes.GET_SEARCH_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_LIST:
      return true;
    case actionTypes.GET_SEARCH_FAIL:
    case actionTypes.GET_SEARCH_SUCCESS:
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
