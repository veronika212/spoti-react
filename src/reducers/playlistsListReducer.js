import { combineReducers } from 'redux';

export const actionTypes = {
  GET_PLAYLISTS_LIST: 'GET_PLAYLISTS_LIST',
  GET_PLAYLISTS_LIST_SUCCESS: 'GET_PLAYLISTS_LIST_SUCCESS',
  GET_PLAYLISTS_LIST_FAIL: 'GET_PLAYLISTS_LIST_FAIL',
};

const defaultState = {
  items: [],
  total: 0,
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS_LIST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS_LIST_FAIL:
      return action.payload;
    case actionTypes.GET_PLAYLISTS_LIST:
    case actionTypes.GET_PLAYLISTS_LIST_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS_LIST:
      return true;
    case actionTypes.GET_PLAYLISTS_LIST_FAIL:
    case actionTypes.GET_PLAYLISTS_LIST_SUCCESS:
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
export const selectSongs = state => state.songs.result.items;
