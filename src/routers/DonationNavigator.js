// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { DonationAppealScreen, DonationResultScreen } from '../screens';
import { NavigationIconButton } from '../atoms';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
}

export default StackNavigator({
  DonationAppealScreen: {
    screen: DonationAppealScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Donate',
    }),
  },
  DonationResultScreen: {
    screen: DonationResultScreen,
  },
});
