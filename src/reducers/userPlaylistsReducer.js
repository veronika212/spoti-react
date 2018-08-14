import { combineReducers } from 'redux';

export const actionTypes = {
  GET_USER_PLAYLISTS: 'GET_USER_PLAYLISTS',
  GET_USER_PLAYLISTS_SUCCESS: 'GET_USER_PLAYLISTS_SUCCESS',
  GET_USER_PLAYLISTS_FAIL: 'GET_USER_PLAYLISTS_FAIL',

  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  CREATE_PLAYLIST_SUCCESS: 'CREATE_PLAYLIST_SUCCESS',
  CREATE_PLAYLIST_FAIL: 'CREATE_PLAYLIST_FAIL',
};

const defaultState = {
  items: [],
  total: 0,
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PLAYLISTS_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PLAYLISTS_FAIL:
    case actionTypes.CREATE_PLAYLIST_FAIL:
      return action.payload;
    case actionTypes.GET_USER_PLAYLISTS:
    case actionTypes.GET_USER_PLAYLISTS_SUCCESS:
    case actionTypes.CREATE_PLAYLIST:
    case actionTypes.CREATE_PLAYLIST_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PLAYLISTS_LIST:
    case actionTypes.CREATE_PLAYLIST:
      return true;
    case actionTypes.GET_USER_PLAYLISTS_FAIL:
    case actionTypes.GET_USER_PLAYLISTS_SUCCESS:
    case actionTypes.CREATE_PLAYLIST_FAIL:
    case actionTypes.CREATE_PLAYLIST_SUCCESS:
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
