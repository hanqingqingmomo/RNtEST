// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { InviteFriendsScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return <Text onPress={onPress}>=</Text>;
}

export default StackNavigator({
  InviteFriendsScreen: {
    screen: InviteFriendsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Invite friends',
    }),
  },
});
