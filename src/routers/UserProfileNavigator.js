// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { UserProfileScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

export default StackNavigator({
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerTitle: 'Your Profile',
    }),
  },
});
