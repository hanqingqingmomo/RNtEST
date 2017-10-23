// @flow

import React from 'react';
import { Linking } from 'react-native';

import { Text } from '../atoms';
import { getColor } from '../utils/color';

export function parseTextContent(string: string, maxLength: number): any {
  if (typeof string === 'string') {
    let words = (string || '').split(/\s/);
    let length = 0;
    let aa = 0;

    words = words
      .filter((word: string) => {
        length += word.length + 1;

        return length < maxLength;
      })
      .map((word: string, idx: number) => {
        if (word.match(/^https?\:\//)) {
          return (
            <Text
              key={idx}
              color={getColor('linkBlue')}
              onPress={() => Linking.openURL(word)}
            >
              {`${word} `}
            </Text>
          );
        }

        return <Text key={idx}>{`${word} `}</Text>;
      });

    if (string.length > maxLength) {
      words.push(<Text key={words.length}>{'... '}</Text>);
      words.push(
        <Text key={words.length + 1} color={getColor('linkBlue')}>
          Continue Reading
        </Text>
      );
    }

    return words;
  }

  return string;
}
