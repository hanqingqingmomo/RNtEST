// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Crashes from 'mobile-center-crashes';

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
    setTimeout(function() {
      Crashes.generateTestCrash();
    }, 10000);
  }

  render = () => {
    const { authenticated } = this.props;

    return (
      <View flexGrow={1}>
        {authenticated ? <MainNavigator /> : <AuthenticationNavigator />}
      </View>
    );
  };
}

export default (connect((state: Store) => ({
  authenticated: selectUser(state) !== null,
})): Connector<{}, Props>)(Application);
