// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import {
  CreateEventScreen,
  CreateDescriptionScreen,
  SelectLocationScreen,
  SelectCommunityScreen,
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
  SelectCommunityScreen: {
    screen: SelectCommunityScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: 'Post in',
    }),
  },
});
