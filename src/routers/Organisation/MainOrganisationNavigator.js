// @flow

import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import { Icon } from '../../atoms';
import AggregatedNewsFeedNavigator from './AggregatedNewsFeedNavigator';
import CommunitiesNavigator from './CommunitiesNavigator';
// import EventFeedNavigator from './EventFeedNavigator';
import { getColor } from '../../utils/color';
import CreditCardForm from '../../blocks/CreditCardForm';
import CreditCardScreen from '../../screens/CreditCardScreen';
import DonationAppealScreen from '../../screens/DonationAppealScreen/DonationAppealScreen';

const makeTabBarIcon = name => iconProps => (
  <Icon name={name} size={24} color={iconProps.tintColor} />
);

export default TabNavigator(
  {
    AggregatedNewsFeedTab: {
      screen: DonationAppealScreen,
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
