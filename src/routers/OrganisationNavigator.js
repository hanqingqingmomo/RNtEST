// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { UserProfileScreen } from '../screens';

function OpenDrawerButton({ onPress }) {
  return <Text onPress={onPress}>open</Text>;
}

export default StackNavigator({
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: <OpenDrawerButton onPress={screenProps.openDrawer} />,
      headerTitle: 'Your Profile',
    }),
  },
});
