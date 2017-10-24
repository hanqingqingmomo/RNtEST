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
  CommunityListScreen,
} from '../../screens';

export default StackNavigator({
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
  CommunityListScreen: {
    screen: CommunityListScreen,
  },
});
