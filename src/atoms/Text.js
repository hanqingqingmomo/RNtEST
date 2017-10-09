// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform, Text as ReactNativeText } from 'react-native';

import { type ColorName, type Style } from '../Types';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

export type Props = {
  color?: ColorName | string,
  size?: number,
  weight?: string,
  lineHeight?: number,
  style?: Style,
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
});

export default class Text extends Component<Props> {
  setNativeProps(nativeProps: any) {
    this.refs['root'].setNativeProps(nativeProps);
  }

  render(): React$Element<*> {
    const { size, color, weight, lineHeight, style, ...bag } = this.props;
    return (
      <ReactNativeText
        {...bag}
        ref="root"
        style={[
          styles.fontFamily,
          style,
          size !== undefined ? css('fontSize', size) : undefined,
          color !== undefined ? css('color', getColor(color)) : undefined,
          weight !== undefined ? css('fontWeight', weight) : undefined,
          lineHeight !== undefined ? css('lineHeight', lineHeight) : undefined,
        ]}
      />
    );
  }
}
