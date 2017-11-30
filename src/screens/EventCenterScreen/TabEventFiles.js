// @flow

import React, { Component } from 'react';

import { CenterView, Text } from '../../atoms';
import { type User } from '../../Types';

type Props = {
  event: Object,
};

export default class TabEventFiles extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    const { event } = this.props;

    return (
      <CenterView>
        <Text size={16}>Nothing to see here.</Text>
      </CenterView>
    );
  }
}
