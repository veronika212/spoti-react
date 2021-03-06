import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import rootSaga from './rootSaga';

import userProfileReducer from '../reducers/userProfileReducer';
import songsReducer from '../reducers/songsReducer';
import playlistDetailReducer from '../reducers/playlistDetailReducer';
import userPlaylistsReducer from '../reducers/userPlaylistsReducer';
import artistsReducer from '../reducers/artistsReducer';
import artistDetailReducer from '../reducers/artistDetailReducer';
import albumDetailReducer from '../reducers/albumDetailReducer';
import searchReducer from '../reducers/searchReducer';

const rootReducer = combineReducers({
  forms: formReducer,
  userProfile: userProfileReducer,
  songs: songsReducer,
  playlistDetail: playlistDetailReducer,
  userPlaylists: userPlaylistsReducer,
  artists: artistsReducer,
  artistDetail: artistDetailReducer,
  albumDetail: albumDetailReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth', 'userProfile', 'songs'],
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, {}, applyMiddleware(sagaMiddleware, logger));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
