// @flow

import React, { Component } from 'react';
import { View as OriginalView } from 'react-native';

import { css } from '../utils/style';

type Props = {
  width?: number,
  height?: number,
};
export default class View extends Component<Props, void> {
  render() {
    const { width, height } = this.props;
    return (
      <OriginalView
        style={[css('width', width || 'auto'), css('height', height || 'auto')]}
      />
    );
  }
}
