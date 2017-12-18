// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { selectUser } from './redux/selectors';
import { AuthenticationStack, MainTabs } from './routers';
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
      <ActionSheetProvider>
        <View flexGrow={1}>
          <Network>
            {authenticated ? <MainTabs /> : <AuthenticationStack />}
          </Network>
        </View>
      </ActionSheetProvider>
    );
  };
}

export default (connect((state: Store) => ({
  authenticated: selectUser(state) !== null,
})): Connector<{}, Props>)(Application);
