import { combineReducers } from '../../../../.cache/typescript/2.9/node_modules/redux';

export const actionTypes = {
  GET_PLAYLIST_DETAIL: 'GET_PLAYLIST_DETAIL',
  GET_PLAYLIST_DETAIL_SUCCESS: 'GET_PLAYLIST_DETAIL_SUCCESS',
  GET_PLAYLIST_DETAIL_FAIL: 'GET_PLAYLIST_DETAIL_FAIL',

  GET_PLAYLIST_COVER_IMAGE: 'GET_PLAYLIST_COVER_IMAGE',
  GET_PLAYLIST_COVER_IMAGE_SUCCESS: 'GET_PLAYLIST_COVER_IMAGE_SUCCESS',
  GET_PLAYLIST_COVER_IMAGE_FAIL: 'GET_PLAYLIST_COVER_IMAGE_FAIL',

  DELETE_PLAYLIST_TRACK: 'DELETE_PLAYLIST_TRACK',
  DELETE_PLAYLIST_TRACK_SUCCESS: 'DELETE_PLAYLIST_TRACK_SUCCESS',
  DELETE_PLAYLIST_TRACK_FAIL: 'DELETE_PLAYLIST_TRACK_FAIL',
};

const defaultState = {
  images: [],
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
    case actionTypes.DELETE_PLAYLIST_TRACK_SUCCESS:
      const deletedTrackPosition = state.items.findIndex(item => item.track.id === action.payload);
      return {
        ...state,
        items: [
          ...state.items.slice(0, deletedTrackPosition),
          ...state.items.slice(deletedTrackPosition + 1),
        ],
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
export const selectPlaylistDetail = state => state.playlistDetail.result;
export const selectPlaylistDetailItems = state => selectPlaylistDetail(state).items;
export const selectPlaylistCoverImages = state => selectPlaylistDetail(state).images;
export const selectPlaylistUser = state => state.userProfile.result;
export const selectPlaylistAditionalInfo = (state, playlistId) => {
  return state.userPlaylists.result.items.find(playlist => playlist.id === playlistId);
};
