// @flow

import React, { Component } from 'react';

import { CenterView, Text } from '../../atoms';
import { type User } from '../../Types';

export default class TabEventFiles extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    return (
      <CenterView>
        <Text size={16}>Nothing to see here.</Text>
      </CenterView>
    );
  }
}
