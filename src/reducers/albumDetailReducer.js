import { combineReducers } from 'redux';

// Action types
export const actionTypes = {
  GET_ALBUM_DETAIL: 'GET_ALBUM_DETAIL',
  GET_ALBUM_DETAIL_SUCCESS: 'GET_ALBUM_DETAIL_SUCCESS',
  GET_ALBUM_DETAIL_FAIL: 'GET_ALBUM_DETAIL_FAIL',
};

//Reducers
const defaultState = {
  artists: [],
  id: '',
  images: [],
  name: '',
  release_date: 0,
  tracks: {
    items: [],
    total: 0,
    offset: 0,
  },
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_ALBUM_DETAIL_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_ALBUM_DETAIL_FAIL:
      return action.payload;
    case actionTypes.GET_ALBUM_DETAIL:
    case actionTypes.GET_ALBUM_DETAIL_SUCCESS:
      return null;
    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ALBUM_DETAIL:
      return true;
    case actionTypes.GET_ALBUM_DETAIL_FAIL:
    case actionTypes.GET_ALBUM_DETAIL_SUCCESS:
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

//Selectors
export const selectAlbumDetail = state => state.albumDetail.result;
export const selectArtists = state => selectAlbumDetail(state).artists;
export const selectImages = state => selectAlbumDetail(state).images;
export const selectTracks = state => selectAlbumDetail(state).tracks;
