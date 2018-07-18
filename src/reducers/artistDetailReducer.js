import { combineReducers } from 'redux';

//Action Types
export const actionTypes = {
  GET_ARTIST_DETAIL_TRACKS: 'GET_ARTIST_DETAIL_TRACKS',
  GET_ARTIST_DETAIL_TRACKS_SUCCESS: 'GET_ARTIST_DETAIL_TRACKS_SUCCESS',
  GET_ARTIST_DETAIL_TRACKS_FAIL: 'GET_ARTIST_DETAIL_TRACKS_FAIL',

  GET_ARTIST_DETAIL: 'GET_ARTIST_DETAIL',
  GET_ARTIST_DETAIL_SUCCESS: 'GET_ARTIST_DETAIL_SUCCESS',
  GET_ARTIST_DETAIL_FAIL: 'GET_ARTIST_DETAIL_FAIL',

  GET_ARTIST_DETAIL_ALBUMS: 'GET_ARTIST_DETAIL_ALBUMS',
  GET_ARTIST_DETAIL_ALBUMS_SUCCESS: 'GET_ARTIST_DETAIL_ALBUMS_SUCCESS',
  GET_ARTIST_DETAIL_ALBUMS_FAIL: 'GET_ARTIST_DETAIL_ALBUMS_FAIL',
};

//Reducers
const defaultState = {
  artist: {
    followers: {
      total: 0,
    },
    id: '',
    images: [],
    name: '',
    popularity: 0,
  },
  tracks: [],
  albums: {
    items: [],
    total: 0,
  },
};

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL_TRACKS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
      return {
        ...state,
        artist: action.payload,
      };
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.payload,
      };
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL_TRACKS_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS_FAIL:
      return action.payload;

    case actionTypes.GET_ARTIST_DETAIL_TRACKS:
    case actionTypes.GET_ARTIST_DETAIL_TRACKS_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL:
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS_SUCCESS:
      return null;

    default:
      return state;
  }
}

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL_TRACKS:
    case actionTypes.GET_ARTIST_DETAIL:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS:
      return true;
    case actionTypes.GET_ARTIST_DETAIL_TRACKS_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_TRACKS_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_ALBUMS_SUCCESS:
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
export const selectArtistDetail = state => state.artistDetail.result.artist;
export const selectArtistDetailTracks = state => state.artistDetail.result.tracks;
export const selectArtistDetailAlbums = state => state.artistDetail.result.albums;
export const selectArtistDetailAlbumsItems = state => state.artistDetail.result.albums.items;
