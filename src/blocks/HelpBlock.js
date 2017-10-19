// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../atoms';
import { getColor } from '../utils/color';

type P = {
  title: string,
  text: string,
};

const styles = StyleSheet.create({
  helpWrapper: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  text: {
    color: getColor('gray'),
  },
  title: {
    color: getColor('orange'),
    fontSize: 20,
    lineHeight: 36,
  },
});

export default function HelpBlock({ text, title }: P) {
  return (
    <View style={[styles.helpWrapper]}>
      <Text style={[styles.title]}>{title}</Text>
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
}
