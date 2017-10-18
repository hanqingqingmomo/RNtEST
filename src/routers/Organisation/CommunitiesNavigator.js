// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import {
  CommunitiesScreen,
  CommunitiesHeader,
  CommunityLandingScreen,
  communitiesHeaderLabels,
} from '../../screens';

export default StackNavigator(
  {
    CommunitiesScreen: {
      screen: props => <CommunitiesScreen {...props} />,
      navigationOptions: {
        header: CommunitiesHeader,
      },
    },

    CommunityLandingScreen: {
      screen: props => <CommunityLandingScreen {...props} />,
      navigationOptions: {
        title: 'Community',
      },
    },
  },
  {
    initialRouteName: 'CommunitiesScreen',
    initialRouteParams: { label: communitiesHeaderLabels[0] },
  }
);
