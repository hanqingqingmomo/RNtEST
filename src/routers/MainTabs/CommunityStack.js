// @flow

import { StackNavigator } from '../../navigation';
import {
  CommunityListScreen,
  CommunityScreen,
  MemberProfileScreen,
  PinnedFeedScreen,
  PostEditorScreen,
  PostScreen,
} from '../../screens';

export default StackNavigator(
  {
    'CommunityTab:Listing': {
      screen: CommunityListScreen,
    },
    'CommunityTab:CommunityScreen': {
      screen: CommunityScreen,
    },
    'CommunityTab:PinnedFeedScreen': {
      screen: PinnedFeedScreen,
    },
    'CommunityTab:PostScreen': {
      screen: PostScreen,
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
