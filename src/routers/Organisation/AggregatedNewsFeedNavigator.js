// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  CommunityCenterScreen,
  HelpScreen,
  MemberProfileScreen,
  PinnedPostsScreen,
  PostDetailScreen,
  PostEditorScreen,
  UserProfileScreen,
  WebViewScreen,
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
    HelpScreen: {
      screen: HelpScreen,
    },
    WebViewScreen: {
      screen: WebViewScreen,
    },
  },
  {
    initialRouteName: 'AggregatedNewsFeedScreen',
  }
);
