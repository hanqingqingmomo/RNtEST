// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  MemberProfileScreen,
  PostDetailScreen,
  PostEditorScreen,
  UserProfileScreen,
} from '../../screens';

export default StackNavigator(
  {
    AggregatedNewsFeedScreen: {
      screen: AggregatedNewsFeedScreen,
    },
    PostDetailScreen: {
      screen: PostDetailScreen,
    },
    PostEditorScreen: {
      screen: PostEditorScreen,
    },
    MemberProfileScreen: {
      screen: MemberProfileScreen,
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
    },
  },
  {
    initialRouteName: 'AggregatedNewsFeedScreen',
  }
);
