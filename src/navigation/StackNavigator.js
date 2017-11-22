// @flow

import merge from 'lodash.merge';
import { StyleSheet } from 'react-native';
import { StackNavigator as ReactNavigationStackNavigator } from 'react-navigation';

import { getColor } from '../utils/color';

const DEFAULTS = screens => ({
  navigationOptions: {
    headerTintColor: getColor('orange'),
    headerTitleStyle: {
      color: '#455A64',
    },
  },
  ...StyleSheet.create({
    cardStyle: {
      backgroundColor: '#F4F5F7',
    },
  }),
});

export default function StackNavigator(screens: Object, options?: Object) {
  return ReactNavigationStackNavigator(
    screens,
    merge(DEFAULTS(screens), options)
  );
}
