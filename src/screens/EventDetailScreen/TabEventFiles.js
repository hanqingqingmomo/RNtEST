// @flow

import React, { Component } from 'react';

import { CenterView, Text } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {
  event: Object,
};

export default class TabEventFiles extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Files',
  };

  render() {
    return (
      <CenterView>
        <Text size={16} color={getColor('gray')}>
          Nothing to see here.
        </Text>
      </CenterView>
    );
  }
}
