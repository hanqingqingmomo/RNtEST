// @flow

import React from 'react';
import { Text } from 'react-native';

type Props = {
  children: string,
};

export function Label(props: Props) {
  return (
    <Text style={{ marginBottom: 10, color: '#90A4AE' }}>{props.children}</Text>
  );
}
