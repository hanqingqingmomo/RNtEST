// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { NotificationSettingsScreen, NewsFeedSettingsScreen } from '../screens';
import { getColor } from '../utils/color';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton
      name="close"
      color={getColor('orange')}
      onPress={onPress}
    />
  );
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
