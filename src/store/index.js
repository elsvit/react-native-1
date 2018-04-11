// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import apiMiddleware from './middleware/api';

import reducer from './modules/index';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(apiMiddleware, sagaMiddleware),
);

sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
