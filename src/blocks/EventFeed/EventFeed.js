// @flow

import React from 'react';
import { Animated, Keyboard, NetInfo, StyleSheet } from 'react-native';

import Event from './Event';
import { TextDeprecated, Text, View } from '../../atoms';

const INITIAL_OPACITY = 0;

type S = {
  animationFinished: boolean,
  isConnected: boolean,
};

const styles = StyleSheet.create({
  fill: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default class EventFeed extends React.Component<*, *, S> {
  state = {};

  render() {
    const { events } = this.props;

    return (
      <View style={{ paddingLeft: 70 }}>
        {events.map(event => <Event event={event.event} key={event.id} />)}
      </View>
    );
  }
}
