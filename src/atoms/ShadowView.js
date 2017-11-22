// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';

import View, { type Props } from './View';
import { css } from '../utils/style';

type P = Props & {
  radius?: number,
};

export default class ShadowView extends Component<P> {
  render() {
    const { radius, style, ...props } = this.props;
    return (
      <View
        {...props}
        style={[
          css('borderRadius', radius === undefined ? 0 : radius),
          styles.shadowByPlatform,
          style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  shadowByPlatform: Platform.select({
    ios: {
      shadowColor: 'rgb(143,142,148)',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      borderRadius: 3,
      shadowOffset: { width: 1, height: 4 },
    },
    android: {
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(143,142,148,0.3)',
    },
  }),
});
