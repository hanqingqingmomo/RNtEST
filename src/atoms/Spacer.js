// @flow

import React from 'react';
import { View as OriginalView } from 'react-native';

import { css } from '../utils/style';

export default class View extends React.Component {
  render() {
    const { width, height } = this.props;
    return (
      <OriginalView
        style={[css('width', width || 'auto'), css('height', height || 'auto')]}
      />
    );
  }
}
