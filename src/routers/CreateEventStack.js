// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import {
  CreateEventScreen,
  CreateDescriptionScreen,
  SelectLocationScreen,
  PostInScreen,
} from '../screens';
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
  CreateDescriptionScreen: {
    screen: CreateDescriptionScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: 'Description',
    }),
  },
  SelectLocationScreen: {
    screen: SelectLocationScreen,
  },
  PostInScreen: {
    screen: PostInScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: 'Post in',
    }),
  },
});
