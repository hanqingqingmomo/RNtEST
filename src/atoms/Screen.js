// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

type Props = {
  children?: React$Element<*>,
  style?: Style,
  tintColor?: string,
};

export default function Screen(props: Props): React$Element<*> {
  const { children, style, tintColor } = props;
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        tintColor ? css('backgroundColor', tintColor) : undefined,
        style,
      ]}
    >
      {props.children}
    </View>
  );
}
