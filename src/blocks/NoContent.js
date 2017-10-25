// @flow

import React, { Component } from 'react';

import { Text, CenterView } from '../atoms';
import { getColor } from '../utils/color';

export default class NoContent extends Component<{}> {
  render() {
    return (
      <CenterView>
        <Text size={16} color={getColor('gray')}>
          No content
        </Text>
      </CenterView>
    );
  }
}
