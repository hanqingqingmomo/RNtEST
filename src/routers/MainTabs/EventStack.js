// @flow

import { StackNavigator } from '../../navigation';
import {
  EventFeedScreen,
  EventDetailScreen,
  MemberProfileScreen,
} from '../../screens';

export default StackNavigator({
  'EventTab:EventFeedScreen': {
    screen: EventFeedScreen,
  },
  'EventTab:EventDetailScreen': {
    screen: EventDetailScreen,
  },
  'EventTab:MemberProfileScreen': {
    screen: MemberProfileScreen,
  },
});
