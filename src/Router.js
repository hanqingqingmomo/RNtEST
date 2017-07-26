// @flow

import { StackNavigator } from 'react-navigation';

import {
  LoginScreen,
  ForgottenPasswordScreen,
  UserProfileScreen,
  WelcomeScreen,
} from './screens';

export const LoginRouter = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    ForgottenPasswordScreen: {
      screen: ForgottenPasswordScreen,
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

export const MainRouter = StackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
    },
  },
  {
    initialRouteName: 'WelcomeScreen',
  }
);
