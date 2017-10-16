// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { selectUser } from './redux/selectors';
import { AuthenticationNavigator, MainNavigator } from './routers';
import { View } from './atoms';
import { Network } from './blocks';
import { type Store } from './Types';

type Props = {
  authenticated: boolean,
};

class Application extends React.PureComponent<Props> {
  componentDidMount() {
    SplashScreen.hide();
  }

  render = () => {
    const { authenticated } = this.props;

    return (
      <View flexGrow={1}>
        <Network />
        {authenticated ? <MainNavigator /> : <AuthenticationNavigator />}
      </View>
    );
  };
}

export default (connect((state: Store) => ({
  authenticated: selectUser(state) !== null,
})): Connector<{}, Props>)(Application);
