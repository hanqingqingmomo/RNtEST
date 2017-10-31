// @flow

import React from 'react';
import { Linking } from 'react-native';

import { Text } from '../atoms';
import { getColor } from '../utils/color';

export function parseTextContent(string: string, maxLength: ?number): any {
  let words = (string || '').split(/\s/);

  if (
    typeof string === 'string' &&
    maxLength !== null &&
    maxLength !== undefined
  ) {
    let length = 0;

    words = words.filter((word: string): boolean => {
      length += word.length + 1;

      if (maxLength !== null && maxLength !== undefined) {
        return length < maxLength;
      }

      return true;
    });

    if (string.length > maxLength) {
      words.push('... ');
      words.push(
        <Text key={words.length + 1} color={getColor('linkBlue')}>
          Continue Reading
        </Text>
      );
    }
  }

  words = words.map((word: string, idx: number): React$Node => {
    if (typeof word === 'string') {
      if (word.match(/^https?\:\//)) {
        // detect url
        return (
          <Text
            key={idx}
            color={getColor('linkBlue')}
            onPress={() => Linking.openURL(word)}
          >
            {`${word} `}
          </Text>
        );
      } else if (
        word.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
      ) {
        // detect email
        return (
          <Text
            key={idx}
            color={getColor('linkBlue')}
            onPress={() => Linking.openURL(`mailto:${word}`)}
          >
            {`${word} `}
          </Text>
        );
      }

      return `${word} `;
    }

    return word;
  });

  return <Text>{words}</Text>;
}
