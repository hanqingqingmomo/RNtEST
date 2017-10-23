// @flow

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { type Style } from '../Types';
import { css } from '../utils/style';

type Props = {
  children?: React$Node,
  containerStyle?: Style,
  fill?: boolean,
  keyboardShouldPersistTaps?: string,
  style?: Style,
  tintColor?: string,
};

export default function Screen(props: Props): React$Element<*> {
  const {
    children,
    containerStyle,
    fill,
    keyboardShouldPersistTaps,
    style,
    tintColor,
  } = props;

  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      alwaysBounceVertical={false}
      overScrollMode="auto"
      contentContainerStyle={[
        fill ? styles.fillContentView : undefined,
        containerStyle,
      ]}
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
