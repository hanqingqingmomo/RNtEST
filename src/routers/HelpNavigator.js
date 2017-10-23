// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { NavigationIconButton } from '../atoms';
import { getColor } from '../utils/color';
import { HelpScreen } from '../screens';

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
  UserProfileScreen: {
    screen: HelpScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Help',
    }),
  },
});
