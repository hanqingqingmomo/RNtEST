// @flow

import { StackNavigator } from '../navigation';

import {
  AuthenticationRootScreen,
  EmailLoginScreen,
  LandingScreen,
  PasswordResetScreen,
} from '../screens';

export default StackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions: {
        header: null,
        headerTitle: null,
      },
    },
    AuthenticationRootScreen: {
      screen: AuthenticationRootScreen,
      navigationOptions: {
        headerTitle: null,
      },
    },
    EmailLoginScreen: {
      screen: EmailLoginScreen,
      navigationOptions: {
        headerTitle: 'Log In',
      },
    },
    PasswordResetScreen: {
      screen: PasswordResetScreen,
      navigationOptions: {
        titleTitle: 'Password Reset',
      },
    },
  },
  {
    initialRouteName: 'LandingScreen',
  }
);
