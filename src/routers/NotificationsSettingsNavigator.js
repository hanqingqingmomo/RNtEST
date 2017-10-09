// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { NotificationSettingsScreen, NewsFeedSettingsScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return <Text onPress={onPress}>=</Text>;
}

export default StackNavigator({
  NotificationSettingsScreen: {
    screen: NotificationSettingsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Notifications',
    }),
  },
  NewsFeedSettingsScreen: {
    screen: NewsFeedSettingsScreen,
    navigationOptions: {
      headerTitle: 'Prioritize',
    },
  },
});
