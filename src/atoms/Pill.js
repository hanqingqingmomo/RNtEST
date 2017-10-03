// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TextDeprecated, View } from './index';

type Props = {
  color: string,
  title: string,
};

export default function Pill({ color, title }: Props) {
  return (
    <View style={[styles.view, { borderColor: color }]}>
      <TextDeprecated style={[styles.title, { color }]}>{title}</TextDeprecated>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  title: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 13,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
