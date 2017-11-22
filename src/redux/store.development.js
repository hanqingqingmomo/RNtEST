// @flow

import { applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { type Persistor } from 'redux-persist/es/types';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import rootReducer from './reducers';
import rootSaga from './sagas';

export function initStore(): { store: Store, persistor: Persistor } {
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

  const persistor: Persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
