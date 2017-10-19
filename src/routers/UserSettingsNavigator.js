// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { InvitationCodeScreen, UserSettingsScreen } from '../screens';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
}

export default StackNavigator({
  UserSettingsScreen: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Settings',
    }),
  },
  InvitationCodeScreen: {
    screen: InvitationCodeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Invitation Code',
    }),
  },
});
