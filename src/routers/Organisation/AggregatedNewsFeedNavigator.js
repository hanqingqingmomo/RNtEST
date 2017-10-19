// @flow

import { StackNavigator } from '../../navigation';
import { AggregatedNewsFeedScreen, PostDetailScreen } from '../../screens';

export default StackNavigator({
  AggregatedNewsFeedScreen: {
    screen: AggregatedNewsFeedScreen,
  },
  PostDetailScreen: {
    screen: PostDetailScreen,
  },
});
