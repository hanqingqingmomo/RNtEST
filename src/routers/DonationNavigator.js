// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { DonationAppealScreen, DonationResultScreen } from '../screens';
import { NavigationIconButton } from '../atoms';
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
