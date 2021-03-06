import { combineReducers } from '../../../../.cache/typescript/2.9/node_modules/redux';

export const actionTypes = {
  GET_SONGS: 'GET_SONGS',
  GET_SONGS_SUCCESS: 'GET_SONGS_SUCCESS',
  GET_SONGS_FAIL: 'GET_SONGS_FAIL',

  DELETE_SONG: 'DELETE_SONG',
  DELETE_SONG_SUCCESS: 'DELETE_SONG_SUCCESS',
  DELETE_SONG_FAIL: 'DELETE_SONG_FAIL',
};

const defaultState = {
  items: [],
  offset: 0,
  total: 0,
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_SONGS_SUCCESS:
      return action.payload;
    case actionTypes.DELETE_SONG_SUCCESS:
      const deleteSongIndex = state.items.findIndex(song => song.track.id === action.payload);

      return {
        ...state,
        items: [
          ...state.items.slice(0, deleteSongIndex),
          ...state.items.slice(deleteSongIndex + 1),
        ],
      };
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_SONGS_FAIL:
      return action.payload;
    case actionTypes.GET_SONGS:
    case actionTypes.GET_SONGS_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_SONGS:
      return true;
    case actionTypes.GET_SONGS_FAIL:
    case actionTypes.GET_SONGS_SUCCESS:
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
export const selectSongs = state => state.songs.result.items;
