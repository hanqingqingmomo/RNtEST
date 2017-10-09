// @flow

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

type Props = {
  children?: React$Node,
  style?: Style,
  tintColor?: string,
  fill?: boolean,
};

export default function Screen(props: Props): React$Element<*> {
  const { children, fill, style, tintColor } = props;
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="auto"
      contentContainerStyle={fill ? styles.fillContentView : undefined}
      style={[
        { flexGrow: 1 },
        tintColor ? css('backgroundColor', tintColor) : undefined,
        style,
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fillContentView: {
    minHeight: '100%',
  },
});
