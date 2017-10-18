// @flow

import { StackNavigator } from '../../navigation';
import {
  CommunityListScreen,
  CommunityLandingScreen,
  OrganisationMemberProfileScreen,
} from '../../screens';

export default StackNavigator(
  {
    CommunityListScreen: {
      screen: CommunityListScreen,
    },

    CommunityLandingScreen: {
      screen: CommunityLandingScreen,
      navigationOptions: {
        title: 'Community',
      },
    },
    MemberProfileScreen: {
      screen: OrganisationMemberProfileScreen,
    },
  },
  {
    initialRouteName: 'CommunityListScreen',
  }
);
