// @flow

import { StackNavigator } from '../../navigation';
import {
  CommunityListScreen,
  CommunityCenterScreen,
  MemberProfileScreen,
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
      screen: MemberProfileScreen,
    },
  },
  {
    initialRouteName: 'CommunityListScreen',
  }
);
