// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../atoms';
import { getColor } from '../utils/color';
import { parseTextContent } from '../utils/text';

type P = {
  title: string,
  text: string,
};

const styles = StyleSheet.create({
  helpWrapper: {
    padding: 15,
  },
});

export default function HelpBlock({ text, title }: P) {
  return (
    <View style={[styles.helpWrapper]}>
      <Text color={getColor('orange')} size={18} lineHeight={20}>
        {title}
      </Text>
      <Text color={getColor('gray')}>{parseTextContent(text, null)}</Text>
    </View>
  );
}
