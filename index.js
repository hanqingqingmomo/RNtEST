// @flow

import './src/ReactotronConfig';

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { PortalProvider } from 'react-native-portal';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import KeyboardManager from 'react-native-keyboard-manager';

import { initFactory as initRequestFactory } from './src/utils/requestFactory';
import { initStore } from './src/redux/store';
import { FetchProvider } from './src/atoms';
import { BootScreen } from './src/screens';
import Application from './src/Application';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnableDebugging(__DEV__);
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}

const { store, persistor } = initStore();

initRequestFactory(store);

AppRegistry.registerComponent('app', () => () => (
  <PersistGate persistor={persistor} loading={<BootScreen />}>
    <PortalProvider>
      <FetchProvider store={store}>
        <Provider store={store}>
          <Application />
        </Provider>
      </FetchProvider>
    </PortalProvider>
  </PersistGate>
));
