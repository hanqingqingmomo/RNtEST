// @flow

import React from 'react';
import { View as OriginalView, StyleSheet } from 'react-native';

import { type Style } from '../Types';

type Props = {
  style?: Style,
  row?: boolean,
};

export default class View extends React.Component<void, Props, void> {
  render() {
    const { style, row, ...bag } = this.props;
    return (
      <OriginalView {...bag} style={[styles[row ? 'row' : 'column'], style]} />
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
