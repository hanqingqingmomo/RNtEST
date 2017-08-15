// @flow

import React from 'react';
import { type Persistor } from 'redux-persist';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';
import KeyboardManager from 'react-native-keyboard-manager';

import { initStore } from './redux/store';
import { BootScreen } from './screens';
import Application from './Application';
import { selectApplicationIsReady } from './redux/selectors';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnableDebugging(__DEV__);
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}

type Props = {
  persistor: Persistor,
  render: (persistor: Persistor, ready: boolean) => React$Element<*>,
};

type State = {
  ready: boolean,
};

export default class Bootloader extends React.PureComponent<*, Props, State> {
  state = {
    ready: false,
  };

  unsubscribeFromPersistorUpdates: ?() => void;

  componentDidMount() {
    const { persistor } = this.props;
    this.unsubscribeFromPersistorUpdates = persistor.subscribe(() => {
      if (selectApplicationIsReady(persistor.getState())) {
        this.setState({ ready: true });
        this.unsubscribeFromPersistorUpdates &&
          this.unsubscribeFromPersistorUpdates();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromPersistorUpdates &&
      this.unsubscribeFromPersistorUpdates();
  }

  render() {
    return this.props.render(this.props.persistor, this.state.ready);
  }
}

AppRegistry.registerComponent('app', () => () =>
  <Bootloader
    persistor={initStore()}
    render={(store, ready) =>
      ready
        ? <Provider store={store}>
            <Application />
          </Provider>
        : <BootScreen />}
  />
);
