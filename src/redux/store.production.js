// @flow

import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { type Persistor } from 'redux-persist/es/types';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

export function initStore(): { store: Store, persistor: Persistor } {
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(
    {
      key: 'redux-state',
      version: 1,
      storage,
      whitelist: ['application'],
    },
    rootReducer
  );

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware))
  );

  const persistor: Persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
