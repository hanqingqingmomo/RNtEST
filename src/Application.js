// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { API } from './services';
import { selectAccessToken, selectUser } from './redux/selectors';
import { AuthenticationRouter, MainRouter } from './routers';
import { Screen } from './atoms';
import { Network } from './blocks';
import type { Store, User } from './Types';

type Props = {
  accessToken: ?string,
  user: ?User,
};

class Application extends React.PureComponent<void, Props, void> {
  componentDidMount() {
    SplashScreen.hide();

    API._transport.interceptors.request.use(config => {
      config.headers = {
        Authorization: this.props.accessToken
          ? `Bearer ${this.props.accessToken}`
          : '',
        ...config.headers,
      };
      return config;
    });
  }

  render = () => {
    const { user } = this.props;

    return (
      <Screen>
        <Network />
        {user ? (
          <MainRouter screenProps={{ user }} />
        ) : (
          <AuthenticationRouter />
        )}
      </Screen>
    );
  };
}

export default (connect((state: Store) => ({
  accessToken: selectAccessToken(state),
  user: selectUser(state),
})): Connector<{}, Props>)(Application);
