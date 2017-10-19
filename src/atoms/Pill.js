// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from './index';
import { type ColorName } from '../Types';

type Props = {
  color?: ColorName | string,
  title: string,
};

export default function Pill({ color, title }: Props) {
  return (
    <View style={[styles.view, { borderColor: color }]}>
      <Text
        color={color}
        size={11}
        weight="500"
        lineHeight={13}
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{ maxWidth: 70 }}
      >
        {title}
      </Text>
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
    paddingHorizontal: 10,
  },
});
