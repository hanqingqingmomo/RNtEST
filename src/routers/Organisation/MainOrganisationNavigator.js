// @flow

import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import { CenterView, Icon, Text } from '../../atoms';
import OrganisationNewsFeedNavigator from './OrganisationNewsFeedNavigator';
import { getColor } from '../../utils/color';

function ScreenComponent(props) {
  return (
    <CenterView>
      <Text>{props.children}</Text>
    </CenterView>
  );
}

const makeTabBarIcon = name => iconProps => (
  <Icon name={name} size={24} color={iconProps.tintColor} />
);

export default TabNavigator(
  {
    OrganisationNewsFeedTab: {
      screen: OrganisationNewsFeedNavigator,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('home'),
      }),
    },
    ConversationsTab: {
      screen: () => <ScreenComponent>Conversations</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('conversation'),
      }),
    },
    CalendarTab: {
      screen: () => <ScreenComponent>Calendar</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('calendar'),
      }),
    },
    CommunitiesTab: {
      screen: () => <ScreenComponent>Communities</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: makeTabBarIcon('communities'),
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: getColor('orange'),
      inactiveTintColor: '#CFD8DC',
    },
  }
);
