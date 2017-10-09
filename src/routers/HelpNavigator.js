// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { CenterView, Text } from '../atoms';

function DismissModalButton({ onPress }) {
  return <Text onPress={onPress}>=</Text>;
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
