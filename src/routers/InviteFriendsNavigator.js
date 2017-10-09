// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { InviteFriendsScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

export default StackNavigator({
  InviteFriendsScreen: {
    screen: InviteFriendsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerTitle: 'Invite friends',
    }),
  },
});
