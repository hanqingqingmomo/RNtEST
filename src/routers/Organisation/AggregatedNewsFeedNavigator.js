// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  CommunityCenterScreen,
  MemberProfileScreen,
  PinnedPostsScreen,
  PostDetailScreen,
  PostEditorScreen,
  UserProfileScreen,
} from '../../screens';

export default StackNavigator(
  {
    AggregatedNewsFeedScreen: {
      screen: AggregatedNewsFeedScreen,
    },
    CommunityCenterScreen: {
      screen: CommunityCenterScreen,
      navigationOptions: {
        title: 'Community',
      },
    },
    PinnedPostsScreen: {
      screen: PinnedPostsScreen,
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
    initialRouteName: 'PostDetailScreen',
    initialRouteParams: {
      postId: '7ea4b6880dfc',
    },
  }
);
