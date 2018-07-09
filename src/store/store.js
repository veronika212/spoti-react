import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import rootSaga from './rootSaga';

import authReducer from '../reducers/authReducer';
import userProfileReducer from '../reducers/userProfileReducer';
import songsReducer from '../reducers/songsReducer';
import playlistDetailReducer from '../reducers/playlistDetailReducer';
import playlistsListReducer from '../reducers/playlistsListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  forms: formReducer,
  userProfile: userProfileReducer,
  songs: songsReducer,
  playlist: playlistDetailReducer,
  userPlaylists: playlistsListReducer,
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
