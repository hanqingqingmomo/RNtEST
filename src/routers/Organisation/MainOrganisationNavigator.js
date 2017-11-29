// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import { Icon } from '../../atoms';
import AggregatedNewsFeedNavigator from './AggregatedNewsFeedNavigator';
import CommunitiesNavigator from './CommunitiesNavigator';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const makeTabBarIcon = name => ({ focused, tintColor }) => (
  <View
    style={[
      styles.tabBarIcon,
      focused ? css('borderBottomColor', tintColor) : undefined,
    ]}
  >
    <Icon name={name} size={24} color={tintColor} />
  </View>
);

export default TabNavigator(
  {
    AggregatedNewsFeedTab: {
      screen: AggregatedNewsFeedNavigator,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('home'),
      }),
    },
    CommunitiesTab: {
      screen: CommunitiesNavigator,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('communities'),
      }),
    },
  },
  {
    initialRouteName: 'AggregatedNewsFeedTab',
    lazy: true,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: getColor('orange'),
      inactiveTintColor: '#CFD8DC',
    },
  }
);

const styles = StyleSheet.create({
  tabBarIcon: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
    width: 50,
    paddingTop: 10,
    alignItems: 'center',
  },
});
