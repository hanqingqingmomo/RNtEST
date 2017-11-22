// @flow

import React, { Component } from 'react';
import { View as OriginalView } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

export type Props = {
  style?: Style,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
};

export default class View extends Component<Props> {
  setNativeProps(nativeProps: any) {
    this.refs['root'].setNativeProps(nativeProps);
  }

  render() {
    const { style, flexDirection, ...bag } = this.props;
    return (
      <OriginalView
        {...bag}
        ref="root"
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
      return css('flexDirection', 'column');
  }
}
