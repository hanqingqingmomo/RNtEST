// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { CenterView, Text, NavigationIconButton } from '../atoms';
import { HelpScreen } from '../screens';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
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
});
