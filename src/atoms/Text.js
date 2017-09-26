// @flow

import React from 'react';
import { StyleSheet, Platform, Text as ReactNativeText } from 'react-native';

import { type ColorName, type Style } from '../Types';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type Props = {
  color?: ColorName,
  size: number,
  weight?: string,
  lineHeight?: number,
  style?: Style,
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
});

export default class Text extends React.Component<void, Props, void> {
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
          css('fontSize', size),
          color !== undefined ? css('color', getColor(color)) : undefined,
          weight !== undefined ? css('fontWeight', weight) : undefined,
          lineHeight !== undefined ? css('lineHeight', lineHeight) : undefined,
        ]}
      />
    );
  }
}
