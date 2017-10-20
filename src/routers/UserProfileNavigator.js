// @flow

import React from 'react';

import { StackNavigator } from '../navigation';
import { UserProfileScreen } from '../screens';

export default StackNavigator({
  UserProfileScreen: {
    screen: UserProfileScreen,
  },
});
