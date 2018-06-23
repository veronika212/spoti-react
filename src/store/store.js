import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import rootSaga from './rootSaga';

import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  forms: formReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
