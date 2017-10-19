// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  PostDetailScreen,
  PostEditorScreen,
} from '../../screens';

export default StackNavigator({
  AggregatedNewsFeedScreen: {
    screen: AggregatedNewsFeedScreen,
  },
  PostDetailScreen: {
    screen: PostDetailScreen,
  },
  PostEditorScreen: {
    screen: PostEditorScreen,
  },
});
