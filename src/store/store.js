import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import rootSaga from './rootSaga';

import authReducer from '../reducers/authReducer';
import userProfileReducer from '../reducers/userProfileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  forms: formReducer,
  userProfile: userProfileReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
