// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { HelpScreen, WebViewScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return <NavigationIconButton name="close" color="orange" onPress={onPress} />;
}

export default StackNavigator({
  UserProfileScreen: {
    screen: HelpScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Help',
    }),
  },
  WebViewScreen: {
    screen: WebViewScreen,
  },
});
