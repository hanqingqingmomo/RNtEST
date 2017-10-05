// @flow

import { StyleSheet } from 'react-native';

import { StackNavigator } from '../navigation';

import {
  AuthenticationRootScreen,
  EmailAuthenticationScreen,
  EmailRegistrationScreen,
  LandingScreen,
  PasswordResetScreen,
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
  },
  {
    initialRouteName: 'LandingScreen',
    initialRouteName: 'PasswordResetScreen',
    // initialRouteName: 'EmailRegistrationScreen',
    ...StyleSheet.create({
      cardStyle: {
        backgroundColor: 'white',
      },
    }),
  }
);
