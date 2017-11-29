// @flow

import { StyleSheet } from 'react-native';

import { StackNavigator } from '../navigation';

import {
  AuthenticationRootScreen,
  EmailAuthenticationScreen,
  EmailRegistrationScreen,
  InvitationCodeScreen,
  LandingScreen,
  PasswordResetScreen,
  PrivacyScreen,
  TermsAndConditionsScreen,
} from '../screens';

export default StackNavigator(
  {
    AuthenticationRootScreen: {
      screen: AuthenticationRootScreen,
      navigationOptions: {
        headerTitle: null,
      },
    },
    EmailAuthenticationScreen: {
      screen: EmailAuthenticationScreen,
      navigationOptions: {
        headerTitle: 'Log In',
      },
    },
    EmailRegistrationScreen: {
      screen: EmailRegistrationScreen,
      navigationOptions: {
        headerTitle: 'Sign Up',
      },
    },
    InvitationCodeScreen: {
      screen: InvitationCodeScreen,
      navigationOptions: {
        headerTitle: 'Invitation Code',
      },
    },
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions: {
        header: null,
        headerTitle: null,
      },
    },
    PasswordResetScreen: {
      screen: PasswordResetScreen,
      navigationOptions: {
        headerTitle: 'Password Reset',
      },
    },
    TermsAndConditionsScreen: {
      screen: TermsAndConditionsScreen,
    },
    PrivacyScreen: {
      screen: PrivacyScreen,
      navigationOptions: {
        headerTitle: 'Privacy Policy',
      },
    },
  },
  {
    initialRouteName: 'LandingScreen',
    ...StyleSheet.create({
      cardStyle: {
        backgroundColor: 'white',
      },
    }),
  }
);
