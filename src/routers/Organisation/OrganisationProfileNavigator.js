// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import {
  OrganisationMemberProfileScreen,
  OrganisationProfileScreen,
} from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: props => <OrganisationProfileScreen {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  OrganisationMemberProfileScreen: {
    screen: OrganisationMemberProfileScreen,
  },
});
