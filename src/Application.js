// @flow

import React from 'react';
import { connect, type Connector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { selectIsAuthenticated } from './redux/selectors';
import { AuthenticationStack, MainTabs } from './routers';
import { View } from './atoms';
import { Network } from './blocks';
import { type Store } from './Types';

type Props = {
  isAuthenticated: boolean,
};

class Application extends React.PureComponent<Props> {
  componentDidMount() {
    SplashScreen.hide();
  }

  render = () => {
    const { isAuthenticated } = this.props;
    return (
      <ActionSheetProvider>
        <View flexGrow={1}>
          <Network>
            {isAuthenticated ? <MainTabs /> : <AuthenticationStack />}
          </Network>
        </View>
      </ActionSheetProvider>
    );
  };
}

export default (connect((state: Store) => ({
  isAuthenticated: selectIsAuthenticated(state),
})): Connector<{}, Props>)(Application);
