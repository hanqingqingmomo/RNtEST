// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { getColor } from '../utils/color';
import {
  InvitationCodeScreen,
  PrivacyScreen,
  TermsAndConditionsScreen,
  UserSettingsScreen,
  ChangePasswordScreen,
} from '../screens';

function DismissModalButton({ onPress }) {
  return <NavigationIconButton name="close" color="orange" onPress={onPress} />;
}

export default StackNavigator({
  UserSettingsScreen: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
    }),
  },
  TermsAndConditionsScreen: {
    screen: TermsAndConditionsScreen,
  },
  PrivacyScreen: {
    screen: PrivacyScreen,
  },
  InvitationCodeScreen: {
    screen: InvitationCodeScreen,
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
  },
});
