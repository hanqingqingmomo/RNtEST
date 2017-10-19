// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import { EventFeedScreen } from '../../screens';

export default StackNavigator({
  EventFeedScreen: {
    screen: props => <EventFeedScreen {...props} />,
  },
});
