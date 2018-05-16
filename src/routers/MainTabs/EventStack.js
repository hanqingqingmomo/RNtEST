// @flow

import { StackNavigator } from '../../navigation';
import {
  EventFeedScreen,
  EventDetailScreen,
  CreateEventScreen,
} from '../../screens';

export default StackNavigator({
  EventFeedScreen: {
    screen: EventFeedScreen,
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
  },
  CreateEventScreen: {
    screen: CreateEventScreen,
  },
});
