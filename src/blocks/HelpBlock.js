// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../atoms';
import { getColor } from '../utils/color';
import { parseTextContent } from '../utils/text';

type Props = {
  list: Array<string>,
  text: Array<
    | string
    | {
      list: Array<string>,
    }
  >,
  title: string,
};

const renderDotList = (list: Array<string>): Array<React$Element<*>> => {
  return list.map((string: string, idx: number) => {
    return (
      <Text key={idx} style={{ marginBottom: 8 }} color={getColor('gray')}>
        &middot; {parseTextContent(string, null)}
      </Text>
    );
  });
};

const renderText = (text: Array<string>): Array<React$Element<*>> => {
  return text.map((item: string | Object, idx: number) => {
    if (typeof item === 'object') {
      if (item.list) {
        return renderDotList(item.list);
      }
    } else {
      return (
        <Text key={idx} style={{ marginVertical: 8 }} color={getColor('gray')}>
          {parseTextContent(item, null)}
        </Text>
      );
    }
  });
};

export default function HelpBlock({ text, title, list }: Props) {
  return (
    <View style={[styles.helpWrapper]}>
      {title ? (
        <Text color={getColor('orange')} size={18} lineHeight={20}>
          {title}
        </Text>
      ) : null}

      {text ? renderText(text) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  helpWrapper: {
    padding: 15,
  },
});
