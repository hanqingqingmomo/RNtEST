// @flow

import { StackNavigator } from '../../navigation';
import {
  AggregatedNewsFeedScreen,
  CommunityCenterScreen,
  MemberProfileScreen,
  PostDetailScreen,
  PostEditorScreen,
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
  PostDetailScreen: {
    screen: PostDetailScreen,
  },
  PostEditorScreen: {
    screen: PostEditorScreen,
  },
  MemberProfileScreen: {
    screen: MemberProfileScreen,
  },
});
