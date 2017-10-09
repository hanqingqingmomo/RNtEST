// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { DonationAppealScreen } from '../screens';

function DrawerButton({ navigation }) {
  return <Text onPress={() => navigation.navigate('DrawerOpen')}>=</Text>;
}

export default StackNavigator({
  DonationAppealScreen: {
    screen: DonationAppealScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerTitle: 'Donate',
    }),
  },
});
