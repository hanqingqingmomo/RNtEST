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
import { ForgottenPasswordScreen, LoginScreen } from '../screens';

// export const MainRouter = StackNavigator({
//   WelcomeScreen: {
//     screen: WelcomeScreen,
//   },
//   UserProfileScreen: {
//     screen: UserProfileScreen,
//   },
// });

// export default DrawerNavigator({
//   PlaygroundTab: {
//     screen: PlaygroundRouter,
//     // navigationOptions: ({ navigation }) => {
//     //   console.log('navigation: ', navigation);

//     //   return {
//     //     headerLeft: <Text>=</Text>,
//     //   };
//     // },
//   },
//   UserProfileScreen: {
//     screen: PlaygroundRouter,
//   },
// });
