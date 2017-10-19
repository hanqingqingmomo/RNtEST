// @flow

import React, { Component } from 'react';

import { Text } from '../../atoms';

export default class AboutTab extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  render() {
    return <Text>About</Text>;
  }
}
