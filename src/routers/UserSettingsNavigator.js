// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { getColor } from '../utils/color';
import {
  InvitationCodeScreen,
  PrivacyScreen,
  TermsScreen,
  UserSettingsScreen,
  ChangePasswordScreen,
} from '../screens';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton
      name="close"
      color={getColor('orange')}
      onPress={onPress}
    />
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
  TermsScreen: {
    screen: TermsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Terms and conditions',
    }),
  },
  PrivacyScreen: {
    screen: PrivacyScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Privacy Policy',
    }),
  },
  InvitationCodeScreen: {
    screen: InvitationCodeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Invitation Code',
    }),
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Change Password',
    }),
  },
});
