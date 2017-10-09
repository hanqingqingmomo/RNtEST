// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { NotificationSettingsScreen, NewsFeedSettingsScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

export default StackNavigator({
  NotificationSettingsScreen: {
    screen: NotificationSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
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
