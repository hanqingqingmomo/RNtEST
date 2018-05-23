// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  MemberProfileScreen,
  PostScreen,
  PostEditorScreen,
} from '../../screens';
import { screens as eventScreens } from './EventStack';

export default StackNavigator(
  {
    'GlobalFeedTab:FeedScreen': {
      screen: AggregatedNewsFeedScreen,
    },
    'GlobalFeedTab:PostScreen': {
      screen: PostScreen,
    },
    'GlobalFeedTab:PostEditorScreen': {
      screen: PostEditorScreen,
    },
    'GlobalFeedTab:MemberProfileScreen': {
      screen: MemberProfileScreen,
    },
    ...eventScreens,
  },
  {
    initialRouteName: `GlobalFeedTab:FeedScreen`,
  }
);
