// @flow

import { StackNavigator } from '../../navigation';
import { AggregatedNewsFeedScreen, PostEditorScreen } from '../../screens';

export default StackNavigator(
  {
  AggregatedNewsFeedScreen: {
    screen: AggregatedNewsFeedScreen,
  },
    PostEditorScreen: {
      screen: PostEditorScreen,
    },
  },
);
