// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';

import { type Style } from '../Types';
import { View } from './index';

type P = {
  style?: Style,
  children?: React$Element<*>,
  radius?: number,
};

export default class Shadow extends Component<P> {
  render() {
    const { radius } = this.props;

    return (
      <View
        style={[
          styles.shadowByPlatform,
          typeof radius !== 'undefined' ? { borderRadius: radius } : undefined,
          this.props.style,
        ]}
      >
        {this.props.children}
      </View>
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
