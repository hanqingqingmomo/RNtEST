// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
} from 'react-navigation';

import { PlaygroundRouter } from './playground';

import { Text } from '../atoms';
import {
  ForgottenPasswordScreen,
  LoginScreen,
  UserProfileScreen,
  WelcomeScreen,
} from '../screens';

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
    ...StyleSheet.create({
      cardStyle: {
        backgroundColor: 'white',
      },
    }),
  }
);

// export const MainRouter = StackNavigator({
//   WelcomeScreen: {
//     screen: WelcomeScreen,
//   },
//   UserProfileScreen: {
//     screen: UserProfileScreen,
//   },
// });

export const MainRouter = DrawerNavigator({
  PlaygroundTab: {
    screen: PlaygroundRouter,
    // navigationOptions: ({ navigation }) => {
    //   console.log('navigation: ', navigation);

    //   return {
    //     headerLeft: <Text>=</Text>,
    //   };
    // },
  },
  UserProfileScreen: {
    screen: PlaygroundRouter,
  },
});
