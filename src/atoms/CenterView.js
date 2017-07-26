// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  direction?: 'row' | 'column',
  style?: any,
};

const styles = StyleSheet.create({
  component: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
});

export default function CenterView(
  props: Props = { direction: 'column' }
): React$Element<*> {
  const { direction = 'column', style, ...rest } = props;

  const directionStyle =
    styles[direction === 'column' ? 'columnDirection' : 'rowDirection'];

  return <View style={[styles.component, directionStyle, style]} {...rest} />;
}
