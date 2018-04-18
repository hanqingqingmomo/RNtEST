// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { CreateEventScreen } from '../screens';
import { NavigationIconButton } from '../atoms';

export default StackNavigator({
  CreateEventScreen: {
    screen: CreateEventScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: 'Create Event',
      headerLeft: (
        <NavigationIconButton
          name="close"
          color="orange"
          onPress={screenProps.dismissModalRoute}
        />
      ),
    }),
  },
});
