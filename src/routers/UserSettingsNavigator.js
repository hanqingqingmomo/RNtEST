// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { InvitationCodeScreen, UserSettingsScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

export default StackNavigator({
  UserSettingsScreen: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
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
