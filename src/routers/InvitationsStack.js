// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { InviteFriendsScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return (
    <NavigationIconButton name="close" color={'orange'} onPress={onPress} />
  );
}

export default StackNavigator({
  InviteFriendsScreen: {
    screen: InviteFriendsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
    }),
  },
});
