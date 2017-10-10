// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { Text } from '../atoms';
import { DonationAppealScreen, DonationResultScreen } from '../screens';

function DismissModalButton({ onPress }) {
  return <Text onPress={onPress}>=</Text>;
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
