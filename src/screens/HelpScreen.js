// @flow

import React, { Component } from 'react';

import { Link, View, Screen, Text } from '../atoms';
import { HelpBlock } from '../blocks';

const help = [
  {
    title: 'Did someone insult you?',
    text: <Text>Call us or visit our page </Text>,
  },
  {
    title: 'Having a bad day?',
    text: <Text>Someone's day is worse</Text>,
  },
];

export default class HelpScreen extends Component<{}> {
  render() {
    return (
      <Screen>
        <View>{help.map((bag, idx) => <HelpBlock key={idx} {...bag} />)}</View>
      </Screen>
    );
  }
}
