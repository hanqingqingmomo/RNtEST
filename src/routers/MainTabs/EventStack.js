// @flow

import { StackNavigator } from '../../navigation';
import {
  EventFeedScreen,
  EventDetailScreen,
  MemberProfileScreen,
} from '../../screens';

export const screens = {
  'EventTab:EventFeedScreen': {
    screen: EventFeedScreen,
  },
  'EventTab:EventDetailScreen': {
    screen: EventDetailScreen,
  },
  'EventTab:MemberProfileScreen': {
    screen: MemberProfileScreen,
  },
};

export default StackNavigator(screens);
