// @flow

import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

export async function initStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    rootReducer(undefined, {}),
    compose(applyMiddleware(sagaMiddleware), autoRehydrate())
  );

  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['user'],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
