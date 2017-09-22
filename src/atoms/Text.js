// @flow

import React from 'react';
import { StyleSheet, Platform, Text as ReactNativeText } from 'react-native';

import { type ColorName, type Style } from '../Types';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type Props = {
  color?: ColorName,
  size: number,
  style?: Style,
};

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
});

export default class Text extends React.Component<void, Props, void> {
  render(): React$Element<*> {
    const { size, color, style, ...bag } = this.props;
    return (
      <ReactNativeText
        {...bag}
        style={[
          styles.fontFamily,
          style,
          color !== undefined ? css('color', getColor(color)) : undefined,
          css('fontSize', size),
        ]}
      />
    );
  }
}
