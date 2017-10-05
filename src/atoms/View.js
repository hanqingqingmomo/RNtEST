// @flow

import React from 'react';
import { View as OriginalView, StyleSheet } from 'react-native';

import { type Style } from '../Types';

type Props = {
  style?: Style,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
};

export default class View extends React.Component<void, Props, void> {
  render() {
    const { style, flexDirection, flexGrow, ...bag } = this.props;
    return (
      <OriginalView
        {...bag}
        flexGrow={flexGrow}
        style={[styles[flexDirection ? 'row' : 'column'], style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  'row-reverse': {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  'column-reverse': {
    flexDirection: 'column-reverse',
  },
});
