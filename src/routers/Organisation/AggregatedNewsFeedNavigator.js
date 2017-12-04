// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  MemberProfileScreen,
  PostDetailScreen,
  PostEditorScreen,
} from '../../screens';

export default StackNavigator(
  {
    'GlobalFeedTab:FeedScreen': {
      screen: AggregatedNewsFeedScreen,
    },
    'GlobalFeedTab:PostScreen': {
      screen: PostDetailScreen,
    },
    'GlobalFeedTab:PostEditorScreen': {
      screen: PostEditorScreen,
    },
    'GlobalFeedTab:MemberProfileScreen': {
      screen: MemberProfileScreen,
    },
  },
  {
    initialRouteName: `GlobalFeedTab:FeedScreen`,
  }
);
