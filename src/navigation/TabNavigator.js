// @flow

import merge from 'lodash.merge';
import { StyleSheet } from 'react-native';

import {
  TabNavigator as ReactNavigationTabNavigator,
  TabBarTop,
} from 'react-navigation';

const DEFAULTS = screens => ({
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop,
  animationEnabled: true,
  tabBarOptions: {
    upperCaseLabel: false,
    showIcon: false,
    scrollEnabled: Object.keys(screens).length > 3,
    activeTintColor: '#455A64',
    style: styles.tabBarStyle,
    labelStyle: styles.labelStyle,
    tabStyle: styles.tabStyle,
    indicatorStyle: styles.indicatorStyle,
  },
});

export default function TabNavigator(screens, options = {}) {
  return ReactNavigationTabNavigator(
    screens,
    merge(options, DEFAULTS(screens))
  );
}

// type ScreenProps = {
//   screen: React$Element,
// };

// type P = {
//   screens: {
//     [string]: ScreenProps,
//   },
// };

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    height: 44,
  },
  labelStyle: {
    color: '#90A4AE',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '500',
    margin: 0,
    flexGrow: 0,
  },
  tabStyle: {
    borderStyle: 'solid',
    borderColor: '#EDEFF2',
    borderBottomWidth: 1,
  },
  indicatorStyle: {
    borderBottomWidth: 3,
    borderColor: '#FC612D',
    borderStyle: 'solid',
  },
});
