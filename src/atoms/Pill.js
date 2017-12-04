// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from './index';
import { type ColorName } from '../Types';
import { css } from '../utils/style';
import { getColor } from '../utils/color';

type Props = {
  color: ColorName | string,
  title: string,
  truncate?: boolean,
};

export default function Pill({ color, title, truncate }: Props) {
  return (
    <View style={[styles.view, css('borderColor', getColor(color))]}>
      <Text
        color={color}
        size={11}
        weight="500"
        lineHeight={13}
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.text, css('maxWidth', truncate ? 70 : 'auto')]}
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
  text: {
    backgroundColor: 'transparent',
  },
});
