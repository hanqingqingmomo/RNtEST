// @flow

import React, { Component } from 'react';

import { CenterView, Text, View } from '../../atoms';
import { type User } from '../../Types';

export default class TabEventFiles extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    return <Text size={500}>Nothing to see here.</Text>;
  }
}
