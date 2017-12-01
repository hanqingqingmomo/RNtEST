// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { DonationAppealScreen, DonationResultScreen } from '../screens';
import { NavigationIconButton } from '../atoms';

function DismissModalButton({ onPress }: { onPress: Function }): React$Node {
  return <NavigationIconButton name="close" color="orange" onPress={onPress} />;
}

// TODO make factory which will inject "close" button into initial route and returns news stack
export default StackNavigator({
  DonationAppealScreen: {
    screen: DonationAppealScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: 'Donate',
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
    }),
  },
  DonationResultScreen: {
    screen: DonationResultScreen,
  },
});
