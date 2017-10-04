// @flow

import React from 'react';
import { CenterView, TimeAgo } from '../atoms';

const TimeAgoPlayground = () => (
  <CenterView>
    <TimeAgo timestamp={1505921297000} />
  </CenterView>
);

TimeAgoPlayground.navigationOptions = { headerTitle: 'Time Ago' };

export default TimeAgoPlayground;
