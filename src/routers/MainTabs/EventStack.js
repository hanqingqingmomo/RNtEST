// @flow

import { StackNavigator } from '../../navigation';
import { EventFeedScreen, EventDetailScreen } from '../../screens';
import { screens as CreateEventStackScreens } from '../CreateEventStack';

export default StackNavigator({
  EventFeedScreen: {
    screen: EventFeedScreen,
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
  },
  ...CreateEventStackScreens,
});
