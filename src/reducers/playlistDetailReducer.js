import { combineReducers } from 'redux';

export const actionTypes = {
  GET_PLAYLIST_DETAIL: 'GET_PLAYLIST_DETAIL',
  GET_PLAYLIST_DETAIL_SUCCESS: 'GET_PLAYLIST_DETAIL_SUCCESS',
  GET_PLAYLIST_DETAIL_FAIL: 'GET_PLAYLIST_DETAIL_FAIL',

  GET_PLAYLIST_COVER_IMAGE: 'GET_PLAYLIST_COVER_IMAGE',
  GET_PLAYLIST_COVER_IMAGE_SUCCESS: 'GET_PLAYLIST_COVER_IMAGE_SUCCESS',
  GET_PLAYLIST_COVER_IMAGE_FAIL: 'GET_PLAYLIST_COVER_IMAGE_FAIL',
};

const defaultState = {
  items: [],
  offset: 0,
  total: 0,
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLIST_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_PLAYLIST_COVER_IMAGE_SUCCESS:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLIST_DETAIL_FAIL:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE_FAIL:
      return action.payload;
    case actionTypes.GET_PLAYLIST_DETAIL:
    case actionTypes.GET_PLAYLIST_DETAIL_SUCCESS:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_PLAYLIST_DETAIL:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE:
      return true;
    case actionTypes.GET_PLAYLIST_DETAIL_FAIL:
    case actionTypes.GET_PLAYLIST_DETAIL_SUCCESS:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE_FAIL:
    case actionTypes.GET_PLAYLIST_COVER_IMAGE_SUCCESS:
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
export const selectPlaylistDetail = state => state.playlist.result.items;
