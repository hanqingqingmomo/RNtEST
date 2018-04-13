// @flow

import React from 'react';
import Autolink from 'react-native-autolink';

import { Text } from '../atoms';
import { getColor } from '../utils/color';

function getSubstring(string, maxLength): string {
  const firstString = string.substr(0, maxLength);
  const lastChar = string.charAt(maxLength);
  let lastString = '';

  if (!/[\s|\n]/.test(lastChar)) {
    lastString = string.substr(maxLength).split(/[\s|\n]/)[0];
  }

  return firstString + lastString;
}

export function parseTextContent(
  string: string,
  maxLength: ?number
): React$Node {
  let newString = maxLength ? getSubstring(string, maxLength) : string;

  if (string.length > newString.length) {
    newString = `${newString} ... `;
  }

  return (
    <Text>
      <Autolink
        text={newString}
        stripPrefix={false}
        truncate={0}
        linkStyle={{ color: getColor('linkBlue') }}
      />
      {string.length > newString.length ? (
        <Text color={getColor('linkBlue')}>Continue Reading</Text>
      ) : null}
    </Text>
  );
}
