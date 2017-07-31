// @flow

import React, { Component } from 'react';
import { AppRegistry, Platform } from 'react-native';
import { connect, Provider } from 'react-redux';
import KeyboardManager from 'react-native-keyboard-manager';

import { API } from './services';
import { initStore } from './redux/store';
import {
  selectAccessToken,
  selectApplicationIsReady,
  selectUser,
} from './redux/selectors';
import { LoginRouter, MainRouter } from './Router';
import { View } from './atoms';
import { OfflineStatusOverlay } from './blocks';
import { BootScreen } from './screens';

@connect(s => ({
  applicationIsReady: selectApplicationIsReady(s),
  user: selectUser(s),
}))
class Application extends Component {
  render() {
    const { applicationIsReady, store, user } = this.props;
    return applicationIsReady
      ? <Provider store={store}>
          {user ? <MainRouter screenProps={{ user: user }} /> : <LoginRouter />}
        </Provider>
      : <BootScreen />;
  }
}

class Bootstrap extends Component {
  state = {
    store: null,
  };

  componentWillMount() {
    (async () => {
      const store = await initStore();
      this.setState({ store });
      // Inject authorization header for each request.
      API._transport.interceptors.request.use(config => {
        const accessToken = selectAccessToken(store.getState());
        config.headers = {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          ...config.headers,
        };
        return config;
      });
    })();
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        {this.state.store
          ? <Application store={this.state.store} />
          : <BootScreen />}
        <OfflineStatusOverlay />
      </View>
    );
  }
}

AppRegistry.registerComponent('app', () => Bootstrap);

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}
