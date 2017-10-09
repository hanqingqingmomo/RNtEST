// @flow

import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';

// import { TabNavigator } from '../navigation';
import { CenterView, Icon, Text } from '../../atoms';
import OrganisationNewsFeedNavigator from './OrganisationNewsFeedNavigator';

// function OpenDrawerButton({ onPress }) {
//   return <Text onPress={onPress}>open</Text>;
// }

function ScreenComponent(props) {
  return (
    <CenterView>
      <Text>{props.children}</Text>
    </CenterView>
  );
}

function TabBarIcon(props) {
  return <Icon {...props} size={24} />;
}

export default TabNavigator(
  {
    OrganisationNewsFeedTab: {
      screen: OrganisationNewsFeedNavigator,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: <TabBarIcon name="home" />,
      }),
    },
    ConversationsTab: {
      screen: () => <ScreenComponent>Conversations</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: <TabBarIcon name="conversation" />,
      }),
    },
    CalendarTab: {
      screen: () => <ScreenComponent>Calendar</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: <TabBarIcon name="calendar" />,
      }),
    },
    CommunitiesTab: {
      screen: () => <ScreenComponent>Communities</ScreenComponent>,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: <TabBarIcon name="communities" />,
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
    },
  }
);
