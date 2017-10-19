// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { UserProfileScreen } from '../screens';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
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
