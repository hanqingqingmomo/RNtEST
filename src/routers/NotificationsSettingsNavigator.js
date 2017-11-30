// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { NotificationSettingsScreen, NewsFeedSettingsScreen } from '../screens';
import { getColor } from '../utils/color';

function DismissModalButton({ onPress }) {
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
    }),
  },
  NewsFeedSettingsScreen: {
    screen: NewsFeedSettingsScreen,
  },
});
