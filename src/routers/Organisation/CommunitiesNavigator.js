// @flow

import { StackNavigator } from '../../navigation';
import {
  CommunityListScreen,
  CommunityCenterScreen,
  OrganisationMemberProfileScreen,
} from '../../screens';

export default StackNavigator(
  {
    CommunityListScreen: {
      screen: CommunityListScreen,
    },
    CommunityCenterScreen: {
      screen: CommunityCenterScreen,
      navigationOptions: {
        title: 'Community',
      },
    },
    CommunityMemberProfileScreen: {
      screen: OrganisationMemberProfileScreen,
    },
  },
  {
    initialRouteName: 'CommunityListScreen',
  }
);
