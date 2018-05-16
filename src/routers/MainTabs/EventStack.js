// @flow

import { StackNavigator } from '../../navigation';
import { EventFeedScreen, EventDetailScreen } from '../../screens';

export default StackNavigator({
  EventFeedScreen: {
    screen: EventFeedScreen,
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
  },
});
