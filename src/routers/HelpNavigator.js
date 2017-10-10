// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { CenterView, Text, NavigationIconButton } from '../atoms';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
}

function ScreenComponent() {
  return (
    <CenterView>
      <Text>Help screen</Text>
    </CenterView>
  );
}

export default StackNavigator({
  UserProfileScreen: {
    screen: ScreenComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerLeft: (
        <DismissModalButton onPress={screenProps.dismissModalRoute} />
      ),
      headerTitle: 'Help',
    }),
  },
});
