// @flow

import merge from 'lodash.merge';
import { StyleSheet } from 'react-native';

import { StackNavigator as ReactNavigationStackNavigator } from 'react-navigation';

// type ScreenProps = {
//   screen: any,
// };

// type Props = {
//   [string]: ScreenProps,
// };

// type TabBarProps = {
//   upperCaseLabel: boolean,
//   showIcon: boolean,
//   scrollEnabled: boolean,
//   activeTintColor: string,
//   style: Object | number,
//   labelStyle: Object | number,
//   tabStyle: Object | number,
//   indicatorStyle: Object | number,
// };

// type OptionProps = {
//   tabBarPosition?: string,
//   tabBarComponent?: React$Element<*>,
//   animationEnabled?: boolean,
//   tabBarOptions?: TabBarProps,
// };

const DEFAULTS = screens => ({
  ...StyleSheet.create({
    cardStyle: {
      backgroundColor: '#F4F5F7',
    },
  }),
});

export default function StackNavigator(screens, options) {
  return ReactNavigationStackNavigator(
    screens,
    merge(DEFAULTS(screens), options)
  );
}
