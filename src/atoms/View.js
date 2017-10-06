// @flow

import React, { Component } from 'react';
import { View as OriginalView, StyleSheet } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

type Props = {
  style?: Style,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
};

export default class View extends Component<Props, void> {
  render() {
    const { style, flexDirection, flexGrow, ...bag } = this.props;
    return (
      <OriginalView
        {...bag}
        flexGrow={flexGrow}
        style={[flexDirectionStyle(flexDirection), style]}
      />
    );
  }
}

function flexDirectionStyle(value): ?number {
  switch (value) {
    case 'row':
    case 'row-reverse':
    case 'column':
    case 'column-reverse':
      return css('flexDirection', value);

    default:
      return undefined;
  }
}
