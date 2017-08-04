// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children?: React$Element<*>,
};

export default function Screen(props: Props): React$Element<*> {
  return (
    <View style={StyleSheet.absoluteFill}>
      {props.children}
    </View>
  );
}
