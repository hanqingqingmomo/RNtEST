// @flow

import { StackNavigator } from '../../navigation';
import {
  CommunityListScreen,
  CommunityCenterScreen,
  PinnedPostsScreen,
  PostDetailScreen,
  PostEditorScreen,
  MemberProfileScreen,
} from '../../screens';

export default StackNavigator(
  {
    'CommunityTab:Listing': {
      screen: CommunityListScreen,
    },
    // TODO pick better name for this screen
    'CommunityTab:CommunityScreen': {
      screen: CommunityCenterScreen,
    },
    'CommunityTab:PinnedFeedScreen': {
      // TODO PinnedPostsScreen => PinnedFeedScreen
      screen: PinnedPostsScreen,
    },
    'CommunityTab:PostScreen': {
      // TODO PostDetailScreen => PostScreen
      screen: PostDetailScreen,
    },
    'CommunityTab:PostEditorScreen': {
      screen: PostEditorScreen,
    },
    // TODO this screen should be opened in modal stack
    'CommunityTab:MemberProfileScreen': {
      screen: MemberProfileScreen,
    },
  },
  {
    initialRouteName: 'CommunityTab:Listing',
  }
);
