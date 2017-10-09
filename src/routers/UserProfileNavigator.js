// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { UserProfileScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return <Text onPress={onPress}>=</Text>;
}

export default StackNavigator({
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Your Profile',
    }),
  },
});
