// @flow

import { StackNavigator } from '../../navigation';
import {
  EventFeedScreen,
  EventDetailScreen,
  MemberProfileScreen,
} from '../../screens';

export default StackNavigator({
  EventFeedScreen: {
    screen: EventFeedScreen,
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
  },
  MemberProfileScreen: {
    screen: MemberProfileScreen,
  },
});
