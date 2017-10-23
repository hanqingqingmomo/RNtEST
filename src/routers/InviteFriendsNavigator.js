// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { InviteFriendsScreen } from '../screens';
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
