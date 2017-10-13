// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import { EventFeedScreen, EventFeedHeader } from '../../screens';

export default StackNavigator({
  EventFeedScreen: {
    screen: props => <EventFeedScreen {...props} />,
    navigationOptions: {
      header: EventFeedHeader,
    },
  },
});
