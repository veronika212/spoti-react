import { combineReducers } from 'redux';

//Action Types
export const actionTypes = {
  GET_ARTIST_DETAIL: 'GET_ARTIST_DETAIL',
  GET_ARTIST_DETAIL_SUCCESS: 'GET_ARTIST_DETAIL_SUCCESS',
  GET_ARTIST_DETAIL_FAIL: 'GET_ARTIST_DETAIL_FAIL',

  GET_ARTIST_DETAIL_IMAGE: 'GET_ARTIST_DETAIL_IMAGE',
  GET_ARTIST_DETAIL_IMAGE_SUCCESS: 'GET_ARTIST_DETAIL_IMAGE_SUCCESS',
  GET_ARTIST_DETAIL_IMAGE_FAIL: 'GET_ARTIST_DETAIL_IMAGE_FAIL',
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
};

// function result(state = defaultState, action) {
//   switch (action.type) {
//     case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
//       return action.payload;
//     default:
//       return state;
//   }
// }

function result(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_ARTIST_DETAIL_IMAGE_SUCCESS:
      return {
        ...state,
        artist: action.payload,
      };
    default:
      return state;
  }
}

// function error(state = null, action) {
//   switch (action.type) {
//     case actionTypes.GET_ARTIST_DETAIL_FAIL:
//       return action.payload;
//     case actionTypes.GET_ARTIST_DETAIL:
//     case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
//       return null;
//     default:
//       return state;
//   }
// }

function error(state = null, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE_FAIL:
      return action.payload;
    case actionTypes.GET_ARTIST_DETAIL:
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE_SUCCESS:
      return null;
    default:
      return state;
  }
}

// function working(state = false, action) {
//     switch (action.type) {
//       case actionTypes.GET_ARTIST_DETAIL:
//         return true;
//       case actionTypes.GET_ARTIST_DETAIL_FAIL:
//       case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
//         return false;
//       default:
//         return state;
//     }
//   }

function working(state = false, action) {
  switch (action.type) {
    case actionTypes.GET_ARTIST_DETAIL:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE:
      return true;
    case actionTypes.GET_ARTIST_DETAIL_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_SUCCESS:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE_FAIL:
    case actionTypes.GET_ARTIST_DETAIL_IMAGE_SUCCESS:
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
export const selectArtistDetailTracks = state => state.artistDetail.result.tracks;
export const selectArtistDetail = state => state.artistDetail.result.artist;
