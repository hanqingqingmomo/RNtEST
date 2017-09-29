// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { View } from './index';

type P = {
  style?: Object,
  children?: React$Element<*>,
};

export default class Shadow extends React.Component<*, P, *> {
  render() {
    return (
      <View style={[styles.shadowByPlatform, this.props.style]}>
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
      shadowOffset: { width: 1, height: 4 },
    },
    android: {
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(143,142,148,0.3)',
    },
  }),
  button: {
    justifyContent: 'flex-end',
  },
});
