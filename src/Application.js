// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { api } from './services';
import { selectAccessToken, selectUser } from './redux/selectors';
import { AuthenticationRouter, MainRouter } from './routers';
import { View } from './atoms';
import { Network } from './blocks';
import type { Store, User } from './Types';

type Props = {
  accessToken: ?string,
  user: ?User,
};

class Application extends React.PureComponent<Props> {
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
      <View flexGrow={1}>
        <Network />
        {user ? <MainRouter /> : <AuthenticationRouter />}
      </View>
    );
  };
}

export default (connect((state: Store) => ({
  accessToken: selectAccessToken(state),
  user: selectUser(state),
})): Connector<{}, Props>)(Application);
