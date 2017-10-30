// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../atoms';
import { getColor } from '../utils/color';
import { parseTextContent } from '../utils/text';
import type { ScreenProps } from '../Types';

type Props = ScreenProps<any> & {
  list?: Array<string>,
  text?: Array<
    | string
    | {
      list: Array<string>,
    }
  >,
  title: string | { label: string, link: string },
};

const renderDotList = (list: Array<string>): Array<React$Node> => {
  return list.map((string: string, idx: number): React$Node => {
    return (
      <Text key={idx} style={{ marginBottom: 8 }} color={getColor('gray')}>
        &middot; {parseTextContent(string, null)}
      </Text>
    );
  });
};

const renderText = (text: Array<string>): Array<React$Node> => {
  return text.map((item: string | Object, idx: number):
    | React$Node
    | Array<React$Node> => {
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

export default function HelpBlock({ text, title, list, navigation }: Props) {
  return (
    <View style={[styles.helpWrapper]}>
      {typeof title === 'string' ? (
        <Text color={getColor('orange')} size={18} lineHeight={20}>
          {title}
        </Text>
      ) : (
        <Text
          color={getColor('orange')}
          size={18}
          lineHeight={20}
          onPress={() => {
            navigation.navigate('WebViewScreen', {
              webURL: title.link,
            });
          }}
        >
          {title.label}
        </Text>
      )}

      {text ? renderText(text) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  helpWrapper: {
    padding: 15,
  },
});
