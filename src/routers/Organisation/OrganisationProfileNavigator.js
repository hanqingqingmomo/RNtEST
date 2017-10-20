// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import { MemberProfileScreen, OrganisationProfileScreen } from '../../screens';

export default StackNavigator({
  OrganisationProfileScreen: {
    screen: props => <OrganisationProfileScreen {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  MemberProfileScreen: {
    screen: MemberProfileScreen,
  },
});
