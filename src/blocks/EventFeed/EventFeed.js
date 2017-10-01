// @flow

import React from 'react';

import Event from './Event';
import { View } from '../../atoms';

const ATTENDING_STATUS = {
  GOING: 'GOING',
  NOT_GOING: 'NOT_GOING',
  PENDING: 'PENDING',
};

type ItemProps = {
  date: Date,
  duration: { from: Date, to: Date },
  id: string,
  live: boolean,
  name: string,
  participants: Array<string>,
  status: $Keys<typeof ATTENDING_STATUS>,
  tag: string,
};

type P = {
  events: Array<ItemProps>,
};

export default class EventFeed extends React.Component<*, P, *> {
  onJoin = id => {};

  onGoing = id => {};

  onNotGoing = id => {};

  render() {
    const { events } = this.props;

    const actions = {
      onJoin: this.onJoin,
      onGoing: this.onGoing,
      onNotGoing: this.onNotGoing,
    };

    return (
      <View style={{ paddingLeft: 70 }}>
        {events.map(event => (
          <Event actions={actions} event={event} key={event.id} />
        ))}
      </View>
    );
  }
}
