// @flow

import React from 'react';
import { Dimensions } from 'react-native';

import Event from './Event';
import { View, DateCard, FlatList } from '../../atoms';

const ATTENDING_STATUS = {
  GOING: 'GOING',
  NOT_GOING: 'NOT_GOING',
  PENDING: 'PENDING',
};

type EventProps = {
  date: Date,
  duration: { from: Date, to: Date },
  id: string,
  live: boolean,
  name: string,
  participants: Array<string>,
  status: $Keys<typeof ATTENDING_STATUS>,
  tag: string,
};

type ItemProps = {
  date: Date,
  events: Array<EventProps>,
};

type P = {
  data: Array<ItemProps>,
};

export default class EventFeed extends React.Component<*, P, *> {
  onJoin = id => {};

  onGoing = id => {};

  onNotGoing = id => {};

  renderEvent = (event, border) => {
    return (
      <Event
        actions={{
          onJoin: this.onJoin,
          onGoing: this.onGoing,
          onNotGoing: this.onNotGoing,
        }}
        event={event}
        key={event.id}
        border={border}
      />
    );
  };

  renderItem = ({ item: { date, events }, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
        key={index}
      >
        <View
          style={{
            paddingVertical: 14,
            paddingRight: 12,
            paddingLeft: 15,
          }}
        >
          <DateCard date={date} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          {events.map((event, idx) => this.renderEvent(event, true))}
        </View>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={data => data.date}
      />
    );
  }
}
