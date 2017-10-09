// @flow

import { applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import rootReducer from './reducers';
import rootSaga from './sagas';

export function initStore(): Store {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: Reactotron.createSagaMonitor(),
  });

  const persistedReducer = persistReducer(
    {
      key: 'redux-state',
      version: 1,
      storage: storage,
      whitelist: ['application'],
    },
    rootReducer
  );

  const store = Reactotron.createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware))
  );

  persistStore(store);

  sagaMiddleware.run(rootSaga);

  return store;
}
